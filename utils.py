import flask
from functools import wraps
from pymysql.cursors import DictCursor
from flaskext.mysql import MySQL
mysql_db = MySQL(cursorclass=DictCursor)

def secured(roles=[]):
    def secured_with_roles(f):
        @wraps(f)
        def login_check(*args, **kwargs):
            if flask.session.get("user") is not None and flask.session.get("user")["uloga"] in roles:
                return f(*args, **kwargs)
            return "", 401
        return login_check
    return secured_with_roles