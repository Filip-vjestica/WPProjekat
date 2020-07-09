(function (angular) {
    var app = angular.module("app");
    app.controller("AdministracijaCtrl", ["$http", function ($http) {
        var that = this;
        this.tretmani = [];
        this.paketi = [];
        this.korisnici = [];
        this.rezervacije = [];

        this.noviKorisnik = {
            "username": "",
            "ime": "",
            "prezime": "",
            "uloga" : "",
            "lozinka": "",
        }

        this.novaRezervacija = {
            "datum": "",
            "tretmani_id": "",
            "korisnici_id": ""
        }

        this.noviTretman = {
            "naziv_m" : "",
            "vrsta" : "",
            "regija" : null,
            "trajanje" : null,
            "cena" : "",
            "opis" : ""
        }

        this.noviPaket = {
            "naziv_p" : "",
            "kolicina" : null,
            "cena" : null,
            "opis" : "",
            "tretmani_id" : ""
        }

        this.dobaviTretmane = function() {
            $http.get("/tretmani").then(function(response){
                that.tretmani = response.data;
            }, function(response) {
                console.log("Neuspesno dobavljanje tretmana! Kod: " + response.status);
            })
        }

         this.dobaviPakete = function() {
            $http.get("/paketi").then(function(response){
                that.paketi = response.data;
            }, function(response) {
                console.log("Neuspesno dobavljanje paketa! Kod: " + response.status);
            })
        }

        this.dobaviRezervacije = function() {
            $http.get("/rezervacije").then(function(response){
                that.rezervacije = response.data;
            }, function(response) {
                console.log("Neuspesno dobavljanje rezervacija! Kod: " + response.status);
            })
        }
        
        this.dodajRezervaciju = function() {
            $http.post("/rezervacije", that.novaRezervacija).then(function(response){
                that.dobaviRezervacije();
            }, function(response){
                console.log("Neuspesno dodavanje rezervacije! Kod: " + response.status);
            });
        }

        this.dodajTretman = function() {
            $http.post("/tretmani", that.noviTretman).then(function(response){
                that.dobaviTretmane();
            }, function(response){
                console.log("Neuspesno dodavanja tretmana! Kod: " + response.status);
            });
        }

        this.dodajPaket = function() {
            $http.post("/paketi", that.noviPaket).then(function(response){
                that.dobaviPakete();
            }, function(response){
                console.log("Neuspesno dodavanje paketa! Kod: " + response.status);
            });
        }

        this.ukloniTretman = function(id) {
            $http.delete("/tretmani/"+id).then(function(response){
                that.dobaviTretmane();
            }, function(response){
                if(response.status == 401) {
                    alert("Ne mozete pristupiti !")
                }
            });
        }

        this.ukloniPaket = function(id) {
            $http.delete("/paketi/"+id).then(function(response){
                that.dobaviPakete();
            }, function(response){
                if(response.status == 401) {
                    alert("Ne mozete pristupiti !")
                }
            });
        }

        this.ukloniRezervaciju = function(id) {
            $http.delete("/rezervacije/"+id).then(function(response){
                that.dobaviRezervacije();
            }, function(response){
                if(response.status == 401) {
                    alert("Ne mozete pristupiti !")
                }
            });
        }

        this.dobaviKorisnike = function() {
            $http.get("/korisnici").then(function(response){
                that.korisnici = response.data;
            }, function(response) {
                if(response.status == 401) {
                    alert("Ne mozete pristupiti !")
                }
            })
        }

        this.ukloniKorisnika = function(username) {
            $http.delete("/korisnici/"+username).then(function(response){
                that.dobaviKorisnike();
            }, function(response){
                if(response.status == 401) {
                    alert("Ne mozete pristupiti !")
                }
            });
        }

        this.dodajKorisnika = function() {
            $http.post("/korisnici/dodavanje", that.noviKorisnik).then(function(response){
                that.dobaviKorisnike();
            }, function(response){
                if(response.status == 401) {
                    alert("Ne mozete pristupiti !")
                }
            });
        }

        this.dobaviTretmane();
        this.dobaviPakete();
        this.dobaviRezervacije();
        this.dobaviKorisnike();
    }]);
})(angular);