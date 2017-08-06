var mongoose = require('mongoose');

module.exports = function(uri){
	mongoose.connect(uri,{server:{poolSize:15}});
	mongoose.set('debug',true);
	var db = mongoose.connection;
	db.once('open', function(){
		console.log('Mongoose! Conectado em '+uri);
	});
	db.on('disconnect', function(){
		console.log('Mongoose! Desconectado de '+uri);
	});
	db.on('error',console.error.bind(console, 'connection error: '));
	process.on('SIGINT', function(){
		db.close(function(){
			console.log('Mongoose! Desconectado pelo término da aplicação');
			//0 indica que a finalização ocorreu sem erros
			process.exit(0);
		});
	});
}