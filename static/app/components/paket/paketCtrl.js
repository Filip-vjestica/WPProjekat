(function(angular) {
    angular.module("app").controller("PaketCtrl", ["$stateParams", "$http", function($stateParams, $http) {
        var that = this;
        this.paket = {};

        this.dobaviPaket = function(id) {
            $http.get("/paket/"+id).then(function(response) {
                that.paket = response.data;
            }, function(response) {
                console.log(response.status);
            });
        }

        this.dobaviPaket($stateParams["id"]);
    }]);
})(angular);