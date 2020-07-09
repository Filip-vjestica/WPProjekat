(function (angular) {
    var app = angular.module("app");
    app.controller("CenovnikCtrl", ["$http", function ($http) {
        var that = this;
        this.tretmani = [];
        this.paketi = [];

        this.login = function() {
            $http.post("/login", that.user).then(function(){
                that.dobaviTretman();
                that.dobaviPakete();
            }, function() {

            })
        }

        this.logout = function() {
            $http.get("/logout").then(function(){
                that.dobaviTretman();
                that.dobaviPakete();
            }, function() {

            })
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

        this.dobaviTretmane();
        this.dobaviPakete();
    }]);
})(angular);