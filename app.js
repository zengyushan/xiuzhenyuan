var myModule = angular.module("myModule",["ngRoute"]);

//myModule.value("appName","MyCoolApp");

myModule.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/login2",{templateUrl:"./template/login2.html"})
	.when("/lbd_backstage",{templateUrl:"./template/lbd_backstage.html"}) 
	.otherwise({redirectTo:"/"});
//	$routeProvider.when("/lbd_add",{template:".lbd_add.html"});
}]);

