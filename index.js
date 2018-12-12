var cpx = require('cpx');
var inquirer = require('inquirer');
var async = require('async');
var path = require('path');
var fs = require('fs');
// cpx.copySync('kue/controllers/*', '../../api/controllers');
// cpx.copySync('kue/views/**', '../../views');
// // cpx.copySync('kue/**', '../../api/');
// console.log('inside generator\'s index.js');
// console.log('inside generator\'s index.js');
console.log(process.cwd());
async.series({
	installKue:function(callback){
		console.log('\n\n\n---------------------------------------');
		inquirer.prompt([
			{
				type: 'confirm',
				name: 'kue',
				message: 'Do you want to install Kue?',
			},
		]).then(answers => {
			if(answers.kue){
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
			}else{
				console.log('Kue installation skipped');
				callback(null);
			}
		});
	},
	installBull:function(callback){
		console.log('\n\n\n---------------------------------------');
		inquirer.prompt([
			{
				type: 'confirm',
				name: 'bull',
				message: 'Do you want to install Bull?',
			},
		]).then(answers => {
			if(answers.bull){
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
			}else{
				console.log('Bull installation skipped');
				callback(null);
			}
		});
	},
	installSomethingElse:function(callback){
		console.log('\n\n\n---------------------------------------');
		inquirer.prompt([
			{
				type: 'confirm',
				name: 'slack_service',
				message: 'Do you want to install slack service?',
			},
		]).then(answers => {
			if(answers.somthing){
				console.log(JSON.stringify(answers, null, '  '));
				// cpx.copySync('kue/controllers/*', '../../api/controllers');
				// cpx.copySync('kue/views/**', '../../views');
				callback(null);
			}else{
				console.log('Slack installation skipped');
				callback(null);
			}
		});
	}

},function(err,results){
	console.log('\n\n\n---------------------------------------');
	console.log("everything done");
})