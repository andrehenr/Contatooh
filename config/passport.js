var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var	config	=	require('./config')();

module.exports = function() {

	var schema = mongoose.Schema({
	    login: { 
	      type: String, 
	      required: true, 
	      index: {
	        unique: true
	      }
	    }, 
	    nome: { 
	      type: String, 
	      required: true,
	    },
	    inclusao: {
	      type: Date, 
	      default: Date.now
	    }
  	});
	schema.plugin(findOrCreate);
	
	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		clientID:config.clientID,
		clientSecret:config.clientSecret,
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done) {
		
		Usuario.findOrCreate(
			{ "login" : profile.username}, 
			{ "nome" : profile.username},  
			function(erro, usuario) {
				if(erro) {
					return done(erro);
				} 
				return done(null, usuario);
			}
		);
	}));

	passport.serializeUser(function(usuario, done) {
	  done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done) {
	  Usuario.findById(id).exec()
	  .then(function(usuario) {
	  	done(null, usuario);	
	  });
	});
};