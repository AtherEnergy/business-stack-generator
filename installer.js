var path = require('path');
var fs = require('fs');
var cpx = require('cpx');

var sails_folder = process.cwd();
var package_folder = path.join(process.cwd(),'node_modules/sails-business-stack-generator');
module.exports={
	installBull:function(callback){		
		if (fs.existsSync(sails_folder+'/api/controllers/BullController.js'))
		    console.log('BullController already exists. It will be over written.');

		cpx.copySync(package_folder+'/bull/controllers/*', sails_folder+'/api/controllers');
		cpx.copySync(package_folder+'/bull/views/**', sails_folder+'/views');
		if(fs.existsSync(sails_folder+'/api/controllers/BullController.js') && fs.existsSync(sails_folder+'/views/bull/index.ejs')){
			console.log("Bull installation successful \
				\nOnly controllers and views are setup. \
				\nYou will need to define the routes and policies manually.\
				\n\
				\n### Add this to routes.js ###\
				\n'GET /bull':'BullController.index',\
				\n'GET /bull/:state':'BullController.listItemsInKue',\
				\n'POST /bull/retry':'BullController.retryJob',\
				\n'POST /bull/delete':'BullController.deleteJob',\
				\n\
				\n### Update policy.js ###\
				\nBullController:{\
				\n  '*':['isAuthenticated','isAdmin']\
				\n},\
				\n\
				\nThis assumes that you have 'isAdmin' policy and 'isAuthenticated' policy defined.\
			");
		}else{
			console.log('bull installation failed');
		}
		callback(null);
	},
	installKue:function(callback){
		
		if (fs.existsSync(sails_folder+'/api/controllers/KueController.js'))
		    console.log('KueController already exists. It will be over written.');

		cpx.copySync(package_folder+'/kue/controllers/*', sails_folder+'/api/controllers');
		cpx.copySync(package_folder+'/kue/views/**', sails_folder+'/views');
		if(fs.existsSync(sails_folder+'/api/controllers/KueController.js') && fs.existsSync(sails_folder+'/views/kue/index.ejs')){
			console.log("Kue installation successful \
				\nOnly controllers and views are setup. \
				\nYou will need to define the routes and policies manually.\
				\n\
				\n### Add this to routes.js ###\
				\n'GET /kue':'KueController.index',\
				\n'GET /kue/:state':'KueController.listItemsInKue',\
				\n'POST /kue/retry':'KueController.retryJob',\
				\n'POST /kue/delete':'KueController.deleteJob',\
				\n\
				\n### Update policy.js ###\
				\nKueController:{\
				\n  '*':['isAuthenticated','isAdmin']\
				\n},\
				\n\
				\nThis assumes that you have 'isAdmin' policy and 'isAuthenticated' policy defined.\
			");


		}else{
			console.log('kue installation failed');
		}
		callback(null);
	},
	installUserLogin:function(callback){

		if (fs.existsSync(sails_folder+'/api/controllers/AuthController.js'))
		    console.log('AuthController already exists. It will be over written.');

		cpx.copySync(package_folder+'/user-login/controllers/*', sails_folder+'/api/controllers');
		cpx.copySync(package_folder+'/user-login/models/*', sails_folder+'/api/models');
		cpx.copySync(package_folder+'/user-login/services/**', sails_folder+'/api/services');
		cpx.copySync(package_folder+'/user-login/policies/**', sails_folder+'/api/policies');
		cpx.copySync(package_folder+'/user-login/views/**', sails_folder+'/views');

		if(fs.existsSync(sails_folder+'/api/controllers/AuthController.js') && fs.existsSync(sails_folder+'/views/login.ejs')){
			var buf = fs.readFileSync(package_folder+'/user-login/text/post_install.txt');
			console.log(buf.toString());

		}else{
			console.log('kue installation failed');
		}
		// console.log('installed user login');
		callback(null);
	},
	installSemanticUI:function(callback){
		cpx.copySync(package_folder+'/assets/semantic/*', sails_folder+'/assets/semantic');
		console.log("\--------------------------------------------------------------------------------\
			\n Semantic installed \
			\n ### Add this to views/layout.ejs ###\
			\n <link rel='stylesheet' type='text/css' href='/semantic/semantic.min.css'>\
			\n--------------------------------------------------------------------------------\
		");
		callback(null);
	},
	installLogging:function(callback){
		var buf = fs.readFileSync(package_folder+'/logging/text/post_install.txt');
		console.log(buf.toString());
		callback(null);
	},
}