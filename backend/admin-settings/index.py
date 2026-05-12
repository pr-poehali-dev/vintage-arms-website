"""Управление настройками сайта: адрес, телефон, часы работы."""
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
    conn = get_conn()
    cur = conn.cursor()

    if method == 'GET':
        cur.execute(f"SELECT key, value FROM {SCHEMA}.site_settings")
        rows = cur.fetchall()
        result = {r[0]: r[1] for r in rows}
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(result, ensure_ascii=False)}

    if method == 'PUT':
        body = json.loads(event.get('body') or '{}')
        for key, value in body.items():
            cur.execute(
                f"""INSERT INTO {SCHEMA}.site_settings (key, value, updated_at)
                    VALUES (%s, %s, NOW())
                    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()""",
                (key, value)
            )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    conn.close()
    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}
