import { Meteor } from 'meteor/meteor';
//import winston from 'winston';
import { Cities } from '/imports/api/lists';
import { Images } from '/imports/api/lists';
//var winston  = require('winston');
//require('winston-loggly-bulk');
 
// winston.add(winston.transports.Loggly, {
//   inputToken: "TOKEN",
//   subdomain: "SUBDOMAIN",
//   tags: ["meteor", "winston"],
//   json:true
// });
  
  
Meteor.methods({
    //  'saveFile': function(buffer){
    //     Images.insert({data:buffer});
    //     console.log(Images.find().fetch());     
    // },
    // 'uploadImage' :function(buffer){
    	
    //     Images.insert({name: "Bob", data:buffer});
    //     //console.log("uploadImage");     
    //     //console.log("uploadImage", buffer);     
    // },
    // 'saveTileImage': function(fileData) {

    // 	console.log(fileData);
    //     var fs = Npm.require('fs');
     
    //  	var path = "D:/Iamnext/meteor/bazait/public/images/";
      	
    //   	// base64Data  =   fileData.replace(/^data:image\/png;base64,/, "");
    //   	// base64Data  +=  base64Data.replace('+', ' ');
    //   	// binaryData  =   new Buffer(base64Data, 'base64').toString('binary');
      	
    //   	// var imageName = "tileImg_"+ ".png";
    //   	// fs.writeFile(path + imageName, binaryData, "binary", Meteor.bindEnvironment(function (err) {
    //    //    	if (err) {
    //    //            throw (new Meteor.Error(500, 'Failed to save file.', err));
    //    //          } else {
    //    //            //insertionTileImage(imageName);
    //    //            console.log("writefile");
    //    //            console.log(path + imageName, binaryData);
    //    //          }
    //    //  }));  


      	
    //   	 var imageName = "tileImg_"+ ".png";
    //   	 fs.writeFile(path + imageName, fileData, "binary", Meteor.bindEnvironment(function (err) {
    //       	if (err) {
    //               throw (new Meteor.Error(500, 'Failed to save file.', err));
    //             } else {
    //               //insertionTileImage(imageName);
    //               console.log("writefile");
    //               console.log(path + imageName, fileData);
    //             }
    //     }));  
    // },
  //   'loadImage': function(fileData) {

  //   	console.log(fileData);
  //       var fs = Npm.require('fs');
    
		// var binaryData  = fileData;
  //      console.log("binary data");

  //     	return binaryData;
      	 
  //   }    
});


Meteor.startup(function() {
  // code to run on server at startup
  // console.log("inserting image", Images.find().count());
  // if(Images.find().count()==0){
  // 	Images.insert({
  // 		img_src: "img.jpg",
  // 		img_alt: "alt text"
  // 			});
  // 	}
   }
);

if(Meteor.isServer){
    console.log("Hello server");
 
	Meteor.methods({
});


    Accounts.onCreateUser(function(options, user) {
    //pass the surname in the options
        console.log(options.profile);
        //log.info('User updated with ', options.profile, ' accepted at ', new Date().toJSON());
        user.profile = options.profile;
        return user;
    });
}

