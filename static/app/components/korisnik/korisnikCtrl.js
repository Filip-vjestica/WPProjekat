(function(angular) {
    angular.module("app").controller("KorisnikCtrl", ["$stateParams", "$http", function($stateParams, $http) {
        var that = this;
        this.korisnik = {};

        this.dobaviKorisnika = function(username) {
            $http.get("/korisnik/"+username).then(function(response) {
                that.korisnik = response.data;
            }, function(response) {
                if(response.status == 401) {
                    alert("Ne mozete pristupiti!")
                }
            });
        }


        this.dobaviKorisnika($stateParams["username"]);
    }]);
})(angular);