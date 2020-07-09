import flask
from flask import Blueprint
from flask import request
from utils import mysql_db,secured

user_blueprint = Blueprint("user blueprint",__name__)

# Login
@user_blueprint.route("/login", methods=["POST"])
def login():
    cr = mysql_db.get_db().cursor()
    cr.execute("SELECT * FROM korisnici where username=%(username)s AND lozinka=%(lozinka)s",flask.request.json)
    user = cr.fetchone()
    if user is not None:
        flask.session["user"] = user
        return flask.jsonify(user),200

    return "Netacno korisnicko ime i/ili lozinka!",401

# Logout
@user_blueprint.route("/logout")
def logout():
    flask.session.pop("user", None)
    return "", 200

# Provera
@user_blueprint.route("/check_session")
def check_session():
    user = flask.session.get("user")
    if user is not None:
        return flask.jsonify(user), 200
    else:
        return "", 400


@user_blueprint.route("/", methods=["GET"])
@secured(roles=["zaposleni", "gost"])
def dobavljanje_korisnika():
    cr = mysql_db.get_db().cursor()
    cr.execute("SELECT * FROM korisnici as k LEFT JOIN paketi as p ON k.paketi_id = p.id")
    korisnici = cr.fetchall()
    return flask.json.jsonify(korisnici)

# Dodavanje novog korisnika(moze samo zaposleni)
@user_blueprint.route("/dodavanje", methods=["POST"])
@secured(roles=["zaposleni"])
def dodavanje_korisnika():
    db = mysql_db.get_db()
    cr = db.cursor()
    cr.execute("INSERT INTO korisnici (username, ime, prezime, lozinka, uloga) VALUES(%(username)s, %(ime)s, %(prezime)s, %(lozinka)s, %(uloga)s)", request.json)
    db.commit()
    return "", 201

# Dobavljanje jednog korisnika (z)
@user_blueprint.route("/<int:korisnik_id>", methods=["GET"])
@secured(roles=["zaposleni"])
def dobavljanje_jednog_korisnika(korisnik_id):
    cr = mysql_db.get_db().cursor()
    cr.execute("SELECT * FROM korisnici WHERE id=%s", (korisnik_id,))
    korisnik = cr.fetchone()
    return flask.jsonify(korisnik)

# Brisanje jednog korisnika (z)
@user_blueprint.route("/<string:username>", methods=["DELETE"])
@secured(roles=["zaposleni"])
def uklanjanje_korisnika(username):
    db = mysql_db.get_db()
    cr = db.cursor()
    cr.execute("DELETE FROM korisnici WHERE username=%s", (username,))
    db.commit()
    return "", 204