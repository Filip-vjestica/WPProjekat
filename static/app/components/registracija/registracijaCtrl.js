(function (angular) {
    var app = angular.module("app");
    app.controller("RegistracijaCtrl", ["$http", function ($http) {
        var that = this;

        this.registrovaniKorisnik = {
            "username": "",
            "ime": "",
            "prezime": "",
            "uloga" : "gost",
            "lozinka": "",
        }

        this.registracijaKorisnika = function() {
            $http.post("/registracija", that.registrovaniKorisnik).then(function(response){
                alert("Uspesna registracija novog korisnika")
            }, function(response){
                if(response.status == 401) {
                    alert("Nije ostvarena registracija novog korisnika!")
                }
            });
        }
    }]);
})(angular);