var cpx = require('cpx');
var inquirer = require('inquirer');
var async = require('async');
var path = require('path');
var fs = require('fs');
var installer =  require('./installer');
// cpx.copySync('kue/controllers/*', '../../api/controllers');
// cpx.copySync('kue/views/**', '../../views');
// // cpx.copySync('kue/**', '../../api/');
// console.log('inside generator\'s index.js');
// console.log('inside generator\'s index.js');
// console.log(process.cwd());

var initialize=function(outer_cb){
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
				// this should show up
				if(answers.kue){
					installer.installKue(callback);
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
					installer.installBull(callback);
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
		// console.log('\n\n\n---------------------------------------');
		// console.log("everything done");
		outer_cb(err);
	})
}

var installSpecific=function(callback){
	inquirer.prompt([
		{
			type: 'list',
			name: 'install_what',
			message: 'What would you like to install?',
			choices:[
				'bull',
				'user-login',
				'kue',
				'semantic',
				'logging',
			]
		},
	]).then(answers => {
		switch (answers.install_what){
			case 'bull':
				installer.installBull(callback);
				break;
			case 'user-login':
				installer.installUserLogin(callback);
				break;
			case 'kue':
				installer.installKue(callback);
				break;
			case 'semantic':
				installer.installSemanticUI(callback);
				break;
			case 'logging':
				installer.installLogging(callback);
				break;
		}
		// callback(null);
	});
}

var checkInstallation=function(callback){
	callback(null);
}


var main = function(callback){
	inquirer.prompt([
		{
			type: 'list',
			name: 'first_action',
			message: 'What would you like to do?',
			choices:['initialize','install','check_installation']
		},
	]).then(answers => {
		// this should show up

		// console.log(answers);
		// console.log(answers.first_action);
		switch (answers.first_action){
			case 'initialize': 
				// console.log('going to do initialize');
				initialize(callback);
				break;
			case 'install': 
				// console.log('going to do install');
				installSpecific(callback);
				break;
			case 'check_installation': 
				// console.log('going to do check_installation');
				initialize(callback);
				break;
				
		}

	});
	// callback(null);
}

main(function(err,results){
	console.log('we are all done');
})


// console.log(installer);









