var path = require('path');
var fs = require('fs');
var cpx = require('cpx');
module.exports={
	installBull:function(callback){
		var sails_folder = process.cwd();
		var package_folder = path.join(process.cwd(),'node_modules/sails-business-stack-generator');
		// console.log(sails_folder);
		// console.log(package_folder);
		
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
		var sails_folder = process.cwd();
		var package_folder = path.join(process.cwd(),'node_modules/sails-business-stack-generator');
		
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
		console.log('installed user login');
		callback(null);
	}
}