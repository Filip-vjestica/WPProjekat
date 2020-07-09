(function (angular) {
    var app = angular.module("app");

    app.controller("LoginCtrl", ["$http", "$state", function ($http, $state) {

        var that = this;
        this.user = { username: "", lozinka: "" }
        this.state = { loggedIn: false, loggedInUser: {}, isAdmin: false };

        this.login = function () {
            $http.post("korisnici/login", that.user).then(function (response) {
                that.loggedIn = true;
                $state.go("home", {}, { reload: true });
                var user = response.data
                that.loggedInUser = user;
                that.user =  { username: "", lozinka: "" }
                if (user.uloga == "zaposleni") {
                    that.isAdmin = true;
                }
            }, function () {
                alert("Neuspešna prijava!");
            })
        }

        this.checkSession = function () {
            $http.get("korisnici/check_session").then(function (response) {
                that.loggedIn = true;
                var user = response.data
                that.loggedInUser = user;
                if (user.uloga == "zaposleni") {
                    that.isAdmin = true;
                }
            }, function () {

            })
        }

        this.logout = function () {
            $http.get("korisnici/logout").then(function () {
                that.loggedIn = false;
                that.isAdmin = false;
                $state.go("home", {}, { reload: true });
            }, function () {

            })
        }


        this.checkSession();
    }]);
})(angular);