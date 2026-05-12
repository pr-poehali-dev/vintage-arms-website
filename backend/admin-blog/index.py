"""Управление статьями блога: список, создание, редактирование, удаление."""
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
            f"SELECT id, category, title, excerpt, content, image_url, read_time, published, created_at FROM {SCHEMA}.blog_posts ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        result = [
            {'id': r[0], 'category': r[1], 'title': r[2], 'excerpt': r[3],
             'content': r[4], 'image_url': r[5], 'read_time': r[6],
             'published': r[7], 'created_at': r[8].isoformat()}
            for r in rows
        ]
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(result, ensure_ascii=False)}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        cur.execute(
            f"""INSERT INTO {SCHEMA}.blog_posts (category, title, excerpt, content, image_url, read_time, published)
                VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id""",
            (body.get('category'), body.get('title'), body.get('excerpt'),
             body.get('content', ''), body.get('image_url', ''),
             body.get('read_time', '5 мин'), body.get('published', True))
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'id': new_id})}

    if method == 'PUT':
        body = json.loads(event.get('body') or '{}')
        cur.execute(
            f"""UPDATE {SCHEMA}.blog_posts
                SET category=%s, title=%s, excerpt=%s, content=%s,
                    image_url=%s, read_time=%s, published=%s, updated_at=NOW()
                WHERE id=%s""",
            (body.get('category'), body.get('title'), body.get('excerpt'),
             body.get('content', ''), body.get('image_url', ''),
             body.get('read_time', '5 мин'), body.get('published', True), body.get('id'))
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    if method == 'DELETE':
        pid = params.get('id')
        cur.execute(f"DELETE FROM {SCHEMA}.blog_posts WHERE id = %s", (pid,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    conn.close()
    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}
