(function(angular) {
    angular.module("app").controller("TretmanCtrl", ["$stateParams", "$http", function($stateParams, $http) {
        var that = this;
        this.tretman = {};

        this.dobaviTretman = function(id) {
            $http.get("/tretmani/"+id).then(function(response) {
                that.tretman = response.data;
            }, function(response) {
                console.log(response.status);
            });
        }
        this.izmeniTretman = function() {
            $http.put("/tretmani/"+that.tretman.id, that.tretman).then(
                function(response) {
                    that.dobaviTretman(that.tretman.id);
                }, function(response) {
                    if(response.status == 401) {
                        alert("Ne mozete pristupiti !")
                    }
                });
        }
        this.dobaviTretman($stateParams["id"]);
    }]);
})(angular);