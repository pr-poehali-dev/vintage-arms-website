"""Управление заявками на консультацию: список, смена статуса."""
import json
import os
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p66635637_vintage_arms_website')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
}

def check_auth(event):
    token = (event.get('headers') or {}).get('x-admin-token', '')
    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    return token == admin_password

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    if not check_auth(event):
        return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Unauthorized'})}

    method = event.get('httpMethod')
    params = event.get('queryStringParameters') or {}

    conn = get_conn()
    cur = conn.cursor()

    if method == 'GET':
        cur.execute(
            f"SELECT id, name, phone, interest, message, status, created_at FROM {SCHEMA}.consultations ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        result = [
            {'id': r[0], 'name': r[1], 'phone': r[2], 'interest': r[3],
             'message': r[4], 'status': r[5], 'created_at': r[6].isoformat()}
            for r in rows
        ]
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(result, ensure_ascii=False)}

    if method == 'PUT':
        body = json.loads(event.get('body') or '{}')
        cid = body.get('id')
        status = body.get('status')
        cur.execute(
            f"UPDATE {SCHEMA}.consultations SET status = %s WHERE id = %s",
            (status, cid)
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    if method == 'DELETE':
        cid = params.get('id')
        cur.execute(f"DELETE FROM {SCHEMA}.consultations WHERE id = %s", (cid,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    conn.close()
    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}
