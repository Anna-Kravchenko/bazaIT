import { Meteor } from 'meteor/meteor';
//import winston from 'winston';

//var winston  = require('winston');
//require('winston-loggly-bulk');
 
// winston.add(winston.transports.Loggly, {
//   inputToken: "TOKEN",
//   subdomain: "SUBDOMAIN",
//   tags: ["meteor", "winston"],
//   json:true
// });
  
  


Meteor.startup(() => {
  // code to run on server at startup
});

if(Meteor.isServer){
    console.log("Hello server");
  
	
	//\.meteor\local\build\programs\server

	Meteor.methods({
    
		'logToFile': function(message){
		    
		    var log4js = require('log4js');
			log4js.configure({
			  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
			  categories: { default: { appenders: ['cheese'], level: 'error' } }
			});
			 
			var logger = log4js.getLogger('cheese');
			
			logger.level = 'debug';
		
			//var infa;// = Session.get('loggerInfo');

			logger.debug(message);
			
			// var log4js = require('log4js');
			// var logger = log4js.getLogger();
			// logger.level = 'debug';
			// logger.debug(message);
    	}

});

	


	//logger.debug("Some debug messages");
    //log.info("logString");
    Accounts.onCreateUser(function(options, user) {
    //pass the surname in the options
        console.log(options.profile);
        //log.info('User updated with ', options.profile, ' accepted at ', new Date().toJSON());
        user.profile = options.profile;
        return user;
    });
}

