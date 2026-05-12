"""Авторизация в админ-панель по паролю. Возвращает токен сессии."""
import json
import os
import secrets
import hashlib

SESSIONS = {}

def handler(event: dict, context) -> dict:
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    password = body.get('password', '')

    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    if not admin_password:
        return {'statusCode': 500, 'headers': headers, 'body': json.dumps({'error': 'Admin password not configured'})}

    if password != admin_password:
        return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'Неверный пароль'})}

    token = secrets.token_hex(32)
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    SESSIONS[token_hash] = True

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'token': token}),
    }
