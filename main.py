import flask
import datetime
from flask import Flask
from flask import request
from utils import mysql_db,secured

from user_blueprint import user_blueprint
from tretman_blueprint import tretman_blueprint

app = Flask(__name__,static_url_path="")
app.secret_key = "secret"

app.register_blueprint(user_blueprint,url_prefix="/korisnici")
app.register_blueprint(tretman_blueprint,url_prefix="/tretmani")

app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'kozmetickisalon'


mysql_db.init_app(app)

@app.route("/")
@app.route("/home")
def home():
    return app.send_static_file("home.html")

@app.route("/rezervacije", methods=["GET"])
def dobavljanje_rezervacija():
    cr = mysql_db.get_db().cursor()
    cr.execute("SELECT * FROM rezervacije, korisnici, tretmani WHERE rezervacije.korisnici_id = korisnici.id and rezervacije.tretmani_id = tretmani.id")
    rezervacije = cr.fetchall()

    
    print(rezervacije)

    return flask.json.jsonify(rezervacije)


@app.route("/paketi", methods=["GET"])
def dobavljanje_paketa():
    cr = mysql_db.get_db().cursor()
    cr.execute("SELECT * FROM paketi as p LEFT JOIN tretmani as ma ON p.tretmani_id = ma.id")
    paketi = cr.fetchall()
    print(paketi)

    return flask.json.jsonify(paketi)

@app.route("/registracija", methods=["POST"])
def registracija_korisnika():
    db = mysql_db.get_db()
    print(db)
    cr = db.cursor()
    cr.execute("INSERT INTO korisnici (username, lozinka, ime, prezime, uloga) VALUES(%(username)s, %(lozinka)s, %(ime)s, %(prezime)s, %(uloga)s)",request.json)
    db.commit()

    return "", 201
    

@app.route("/rezervacije", methods=["POST"])
def dodavanje_rezervacije():
    db = mysql_db.get_db()
    cr = db.cursor()
    cr.execute("INSERT INTO rezervacije (datum, tretmani_id, korisnici_id) VALUES ( %(datum)s, %(tretmani_id)s, %(korisnici_id)s)", request.json)
    db.commit()

    return "", 201


@app.route("/tretmani", methods=["POST"])
def dodavanje_tretmana():
    db = mysql_db.get_db()
    cr = db.cursor()
    cr.execute("INSERT INTO tretmani (naziv_m, vrsta, regija, trajanje, cena, opis) VALUES(%(naziv_m)s, %(vrsta)s, %(regija)s, %(trajanje)s, %(cena)s, %(opis)s)", request.json)
    db.commit()

    return "", 201


@app.route("/paketi", methods=["POST"])
def dodavanje_paketa():
    db = mysql_db.get_db()
    cr = db.cursor()
    cr.execute("INSERT INTO paketi (naziv_p, kolicina, cena, opis, tretmani_id) VALUES(%(naziv_p)s, %(kolicina)s, %(cena)s, %(opis)s, %(tretmani_id)s)", request.json)
    db.commit()

    return "", 201

@app.route("/rezervacije/<int:id_rezervacije>", methods=["DELETE"])
def uklanjanje_rezervacije(id_rezervacije):
    db = mysql_db.get_db()
    cr = db.cursor()
    cr.execute("DELETE FROM rezervacije WHERE id=%s", (id_rezervacije,))
    db.commit()

    return "", 204 

@app.route("/paketi/<int:id_paketi>", methods=["DELETE"])
def uklanjanje_paketa(id_paketi):
    db = mysql_db.get_db()
    cr = db.cursor()
    cr.execute("DELETE FROM paketi WHERE id=%s", (id_paketi,))
    db.commit()

    return "", 204 

@app.route("/paket/<int:id_paketi>", methods=["GET"])
def dobavljanje_jednog_paketa(id_paketi):
    cr = mysql_db.get_db().cursor()
    cr.execute("SELECT * FROM paketi WHERE id=%s", (id_paketi, ))
    jedan_paket = cr.fetchone()
    return flask.jsonify(jedan_paket)

if __name__ == "__main__":
    app.run("0.0.0.0", 5000, threaded=True)


#http://localhost:5000 
