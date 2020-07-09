(function(angular){
    var app = angular.module("app", ["ui.router"]);
    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $stateProvider.state({
            name: "home",
            url: "/",
            templateUrl: "/app/components/cenovnik/cenovnik.html",
            controller: "CenovnikCtrl",
            controllerAs: "cc"
        }).state({
            name: "administracijaKorisnici",
            url: "/administracija-korisnici",
            templateUrl: "/app/components/administracija/korisnici.html",
            controller: "AdministracijaCtrl",
            controllerAs: "ac"
        }).state({
            name: "administracijaTretmana",
            url: "/administracija-tretmani",
            templateUrl: "/app/components/administracija/tretmani.html",
            controller: "AdministracijaCtrl",
            controllerAs: "ac"
        }).state({
            name: "administracijaPaketi",
            url: "/administracija-paketi",
            templateUrl: "/app/components/administracija/paketi.html",
            controller: "AdministracijaCtrl",
            controllerAs: "ac"
        }).state({
            name: "administracijaRezervacije",
            url: "/administracija-rezervacije",
            templateUrl: "/app/components/administracija/rezervacije.html",
            controller: "AdministracijaCtrl",
            controllerAs: "ac"
        }).state({
            name: "tretman",
            url: "/tretman/{id: int}",
            templateUrl: "/app/components/tretman/tretman.html",
            controller: "TretmanCtrl",
            controllerAs: "mc"
        }).state({
            name: "korisnik",
            url: "/korisnici/{username: string}",
            templateUrl: "/app/components/korisnik/korisnik.html",
            controller: "KorisnikCtrl",
            controllerAs: "kc"
        }).state({
            name: "paket",
            url: "/paket/{id: int}",
            templateUrl: "/app/components/paket/paket.html",
            controller: "PaketCtrl",
            controllerAs: "pc"
        }).state({
            name: "registracija",
            url: "/registracija",
            templateUrl: "/app/components/registracija/registracija.html",
            controller: "RegistracijaCtrl",
            controllerAs: "rgc"
        });

        $urlRouterProvider.otherwise("/");
    }]);
})(angular);