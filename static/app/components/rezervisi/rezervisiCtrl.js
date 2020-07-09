(function(angular){
    angular.module('app').controller("RezervisiCtrl", ["$http", function($http) {
        var that = this;

        this.korisnici = [];
        this.tretmani = [];
        this.rezervacije = [];

        this.novaRezervacija = {
            "datum": "",
            "korisnik_id": "",
            "tretmani_id": ""
        }

        this.dobaviKorisnike = function() {
            $http.get("/korisnici").then(function(response) {
                that.korisnici = response.data;
            }, function() {});
        }

        this.dobaviTretmane = function() {
            $http.get("/tretmani").then(function(response) {
                that.tretmani = response.data;
            }, function() {});
        }

        this.dobaviRezervacije = function() {
            $http.get("/rezervacije").then(function(response) {
                that.rezervacije = response.data;
            }, function() {});
        }

        this.dodajRezervacije = function() {
            $http.post("/rezervacije", that.novaRezervacija).then(function(response) {
                that.dobaviRezervacije();
            }, function() {});
        }

        this.dobaviTretmane();
        this.dobaviKorisnike();
        this.dobaviRezervacije();
    }]);
})(angular);