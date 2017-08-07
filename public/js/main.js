angular.module('contatooh', ['ngRoute','ngResource','meusComponentes']) 
	.config(function($httpProvider,$routeProvider){
		$httpProvider.interceptors.push('meuInterceptor');
		$routeProvider.otherwise({redirectTo: '/contatos'});
		$routeProvider.when('/contatos',{
			templateUrl: 'partials/contatos.html',
			controller: 'ContatosController'
		});
		$routeProvider.when('/contato/:contatoId',	{
			templateUrl:	'partials/contato.html',	
			controller:	'ContatoController'
		});
		$routeProvider.when('/contato',{
			templateUrl: 'partials/contato.html',
			controller: 'ContatoController'
		});
		$routeProvider.when('/auth',{
			templateUrl: 'partials/auth.html'
		});
	});
	