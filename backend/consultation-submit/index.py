"""Приём заявок на консультацию с публичной формы сайта."""
import json
import os
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p66635637_vintage_arms_website')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Имя и телефон обязательны'})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {SCHEMA}.consultations (name, phone, interest, message) VALUES (%s, %s, %s, %s)",
        (name, phone, body.get('interest', ''), body.get('message', ''))
    )
    conn.commit()
    conn.close()

    return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True}, ensure_ascii=False)}
