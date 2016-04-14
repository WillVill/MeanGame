angular.module('app', ['ngRoute','appRoutes','authCtrl','gameCtrl']);

angular.element(document).ready(function(){
    angular.bootstrap(document,[app]);
});