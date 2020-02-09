var path = require('path');
var fs = require('fs');
var cpx = require('cpx');
var npm = require('npm');

var sails_folder = process.cwd();

var package_folder = path.join(process.cwd(),'node_modules/business-stack-generator');
module.exports={
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
		// install jquery dependency
		cpx.copySync(package_folder+'/assets/jquery/**', sails_folder+'/assets/dependencies/');
		cpx.copySync(package_folder+'/assets/semantic/**', sails_folder+'/assets/dependencies/sematic');
		console.log("\--------------------------------------------------------------------------------\
			\n Semantic installed \
		");
		callback(null);
	},
	installLogging:function(callback){
		// install sails-helper
		require('child_process').execSync('npm install --save sails-helper');
		cpx.copySync(package_folder+'/logging/config/**', sails_folder+'/config');
		// install kinesis ebextensions
		cpx.copySync(package_folder+'/logging/.ebextensions/**', sails_folder+'/.ebextensions');
		var buf = fs.readFileSync(package_folder+'/logging/text/post_install.txt');
		console.log(buf.toString());
		callback(null);
	},
	installRateLimit:function(callback){
		cpx.copySync(package_folder+'/rateLimit/policies/**', sails_folder+'/api/policies');
		var buf = fs.readFileSync(package_folder+'/rateLimit/text/post_install.txt');
		console.log(buf.toString());
		callback(null);
	},
	installSendgrid:function(callback){
		cpx.copySync(package_folder+'/sendgrid/config/**', sails_folder+'/config');
		cpx.copySync(package_folder+'/sendgrid/services/**', sails_folder+'/api/services');
		var buf = fs.readFileSync(package_folder+'/sendgrid/text/post_install.txt');
		console.log(buf.toString());
		callback(null);
	},
	installBull:function(callback){
		// install bull npm package
		require('child_process').execSync('npm install --save bull');
		if (fs.existsSync(sails_folder+'/api/controllers/BullController.js'))
		    console.log('BullController already exists. It will be over written.');

		cpx.copySync(package_folder+'/bull/controllers/*', sails_folder+'/api/controllers');
		cpx.copySync(package_folder+'/bull/services/*', sails_folder+'/api/services');
		cpx.copySync(package_folder+'/bull/config/*', sails_folder+'/config');
		cpx.copySync(package_folder+'/bull/views/**', sails_folder+'/views');
		cpx.copySync(package_folder+'/bull/bootstraps/**', sails_folder+'/bootstraps');
		if(fs.existsSync(sails_folder+'/api/controllers/BullController.js') && fs.existsSync(sails_folder+'/views/bull/index.ejs')){
			var buf = fs.readFileSync(package_folder+'/bull/text/post_install.txt');
			console.log(buf.toString());
		}else{
			console.log('bull installation failed');
		}
		callback(null);
	},
	installTrix:function(callback){
		cpx.copySync(package_folder+'/assets/trix/**', sails_folder+'/assets/trix');
		console.log("\--------------------------------------------------------------------------------\
			\n Trix assets installed \
			\n ### Add this to pages where you want to use trix ###\
			\n <link rel='stylesheet' type='text/css' href='/trix/trix.css'> \
			\n <script type='text/javascript' src='/trix/trix.js'></script> \
			\n--------------------------------------------------------------------------------\
		");
		callback(null);
	},
	installSentry:function(callback){
		// install Sentry npm package
		require('child_process').execSync('npm install --save @sentry/node');
		var buf = fs.readFileSync(package_folder+'/sentry/text/post_install.txt');
		console.log(buf.toString());
		callback(null);
	},
	installGroupAccess:function(callback){
		require('child_process').execSync('npm install --save bcryptjs');
		require('child_process').execSync('npm install --save async');
		cpx.copySync(package_folder+'/group-based-access/controllers/*', sails_folder+'/api/controllers');
		cpx.copySync(package_folder+'/group-based-access/models/*', sails_folder+'/api/models');
		cpx.copySync(package_folder+'/group-based-access/views/**', sails_folder+'/views');
		var buf = fs.readFileSync(package_folder+'/group-based-access/text/post_install.txt');
		console.log(buf.toString());
		callback(null);
	},
	installPaytmPayments:function(callback){
		require('child_process').execSync('npm install --save random-number');
		cpx.copySync(package_folder+'/paytmPayment/controllers/*', sails_folder+'/api/controllers');
		cpx.copySync(package_folder+'/paytmPayment/paytmFiles/**', sails_folder + '/');
		cpx.copySync(package_folder+'/paytmPayment/views/**', sails_folder+'/views');
		var buf = fs.readFileSync(package_folder+'/paytmPayment/text/post_install.txt');
		console.log(buf.toString());
		callback(null);
	},
	installSwagger: function(callback) {

		// Runs all the functions in chain in order,
		// in case of success cb(null) is called,
		// else cb(first error).
		function serial(inputArray, cb) {
			// recursive function
			function action(index) {
				if (index < inputArray.length) {
					var fn = inputArray[index];
					fn((err) => {
						if (!err) {
							action(index + 1);
						} else {
							cb(err);
						}
					});
				} else {
					cb();
				}
			}
			action(0);
		}

		function copy(src, dest) {
			return cb => {
				src = package_folder + src;
				dest = sails_folder + dest;
				cpx.copy(src, dest, cb);
			}
		}

		function initNpm() {
			return cb => npm.load(cb);
		}

		function install(package) {
			return cb => npm.commands.install([package], cb);
		}

		function printInstructions(cb) {
			fs.readFile(package_folder + '/swagger/instructions.txt', {
				encoding: 'utf8',
			}, (err, data) => {
				if (!err) {
					console.log(data);
				}
				cb(err);
			})
		}

		serial([
			copy('/swagger/controllers/*', '/api/controllers'),
			copy('/swagger/config/*', '/config'),
			copy('/swagger/views/**', '/views'),
			initNpm(),
			install("swagger-ui-dist@3.25.0"),
			install("swagger-ui-themes@3.0.1"),
			install("gitnanji/sails-hook-swagger-generator#sails1.0_patch"),
			printInstructions,
		], callback);
	}
}