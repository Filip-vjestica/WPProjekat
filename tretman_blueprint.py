import flask
from flask import Blueprint
from flask import request
from utils import mysql_db,secured

tretman_blueprint = Blueprint("tretman blueprint",__name__)


@tretman_blueprint.route("/", methods=["GET"])
def dobavljanje_tretmana():
    cr = mysql_db.get_db().cursor()
    cr.execute("SELECT * FROM tretmani")
    tretman = cr.fetchall()
    print(tretman)
    return flask.json.jsonify(tretman)


@tretman_blueprint.route("/<int:tretman_id>", methods=["GET"])
def dobavljanje_jednog_tretmana(tretman_id):
    cr = mysql_db.get_db().cursor()
    cr.execute("SELECT * FROM tretmani WHERE id=%s", (tretman_id, ))
    jedan_tretman = cr.fetchone()
    return flask.jsonify(jedan_tretman)


@tretman_blueprint.route("/<int:tretman_id>", methods=["DELETE"])
@secured(roles=["zaposleni"])
def uklanjanje_tretmana(tretman_id):
    db = mysql_db.get_db()
    cr = db.cursor()
    cr.execute("DELETE FROM tretmani WHERE id=%s", (tretman_id, ))
    db.commit()
    return "", 204
