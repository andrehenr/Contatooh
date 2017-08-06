function verficaAutenticacao(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		res.status('401').json('Não autorizado');
	}
}
module.exports = function(app){
	var controller = app.controllers.contato;
	app.route('/contatos')
			.get(verficaAutenticacao,controller.listaContatos)
			.post(verficaAutenticacao,controller.salvaContato);

	app.route('/contatos/:id')
		.get(verficaAutenticacao,controller.obtemContato)
		.delete(verficaAutenticacao,controller.removeContato);	
};