import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
//import { winston } from 'meteor/clinical:winston-browser-logging';

import './main.html';

AspirantsList = new Mongo.Collection('aspirants');
var logString = "Some debug message"+"\r\n";
Router.configure({
    layoutTemplate: 'main'
});

Router.route('/about');
Router.route('/services');
//Router.route('/register');
Router.route('/', {
    name: 'home',
    template: 'home'
});





if(Meteor.isClient){
    //const log = require('simple-node-logger').createSimpleFileLogger('project.log');
    
    // starting from Meteor 1.3, it's best to explicitly declare your imports 

    Meteor.startup(function(){
        // You should see a message on both the browser console and Loggly.com
       // winston.info("winston-client has started on the client!");


    });  
      

    

    
    setTimeout(function() { Meteor.call('logToFile', logString); }, 4000);

    Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
            var newemail = event.target.registerEmail.value;
            var newpassword = event.target.registerPassword.value;
            var firstname = event.target.firstName.value;
            var lastname = event.target.lastName.value;

            var options = {
                email : newemail,
                password: newpassword,
                profile: {
                    name: firstname,
                    surname: lastname
                    },
            };

            logString+='RegisterForm submitted ', options, ' accepted at ', new Date().toJSON()+"\r\n";


            // Accounts.createUser({
            //     email: newemail,
            //     password: newpassword,
            //     firstName: firstName,
            //     lastName: lastName
            // });
            Accounts.createUser(options , function(err){
                if( err ) $('div#errors').html( err.message );
            });
            
            logString+=Meteor.users.find().fetch(),' accepted at ', new Date().toJSON()+"\r\n";
            console.log(Meteor.users.find().fetch());
            Meteor.call('logToFile', logString);

            $(".login__popup_both").removeClass("login__popup");
            $("#overlay").css("display"," none");
        }
    });

     Template.login.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar = event.target.loginEmail.value;
            var passwordVar = event.target.loginPassword.value;
            Meteor.loginWithPassword(emailVar, passwordVar);
            
    
            $(".login__popup_both").removeClass("login__popup");
            $(".login__popup_signin").css("display", "none");
            $("#overlay").css("display"," none");

            logString+='Login Form submitted.',' accepted at ', new Date().toJSON()+"\r\n";
            Meteor.call('logToFile', logString);
        }
    });

     Template.dashboard.events({
        'click .logout': function(event){
            event.preventDefault();
            Meteor.logout();
            logString+='Logout clicked.',' accepted at ', new Date().toJSON()+"\r\n";
            Meteor.call('logToFile', logString);
        }

    });

    Template.jobseekers.events({
        'click .login__labels_link': function (event) {
            event.preventDefault();

            // $(event.target).addClass("login__popup");
            $(".login__popup_both").addClass("login__popup");
            $(".login__popup_signin").css("display", "block");
            $("#overlay").css("display"," block");
      
            logString+='Popup showed.',' accepted at ', new Date().toJSON()+"\r\n";
            Meteor.call('logToFile', logString);
        },
        'click #overlay': function (event) {
            event.preventDefault();

            // $(event.target).addClass("login__popup");
            $(".login__popup_both").removeClass("login__popup");
            $(".login__popup_signin").css("display", "none");
            $("#overlay").css("display"," none");
       
            logString+='Popup hidden.',' accepted at ', new Date().toJSON()+"\r\n";
            Meteor.call('logToFile', logString);
        }
    });

    Template.loginMenu.events({
        'click #loginMenuRegister': function (event) {
        
            event.preventDefault();

            // $(event.target).addClass("login__popup");
            // $(".login__popup_signup").addClass("login__popup");
            // $(".login__popup_signin").removeClass("login__popup");
            $(".login__popup_signup").css("display", "block");
            $(".login__popup_signin").css("display", "none");

            
            /*console.log($("#loginMenuRegister").closest("div.info__menu_tab"));
            $("#loginMenuRegister").closest("div.info__menu_tab").addClass("info__menu_tab_active");
            console.log($("#loginMenuRegister").closest("div.info__menu_tab"));
            // console.log($("#loginMenuRegister").parent());*/
            $("#loginMenuRegister").css("color","#EEA079");
            $("#loginMenuSignIn").css("color","#33476F");
            $("#overlay").css("display"," block");

            logString+='Register Popup showed.',' accepted at ', new Date().toJSON()+"\r\n";
            Meteor.call('logToFile', logString);
        },
        'click #loginMenuSignIn': function (event) {
           
            event.preventDefault();

            $("#loginMenuSignIn").css("color","#EEA079");
            $("#loginMenuRegister").css("color","#33476F");

            // $(event.target).addClass("login__popup");
            // $(".login__popup_signin").addClass("login__popup");
            // $(".login__popup_signup").removeClass("login__popup");

            $(".login__popup_signup").css("display", "none");
            $(".login__popup_signin").css("display", "block");
            $("#overlay").css("display"," block");

            logString+='Login Popup showed.',' accepted at ', new Date().toJSON()+"\r\n";
            Meteor.call('logToFile', logString);

        }
    });

    Template.jobseekers.helpers({
        'greetings': function(){
            logString+='Greetings showed.',' accepted at ', new Date().toJSON()+"\r\n";
            Meteor.call('logToFile', logString);
            //textToSend = encodeURIComponent(textToSend);
            return "Привіт, "+(Meteor.user().profile['surname']);
        }
    });
};



/*if(Meteor.isServer){
    console.log("Hello server");

    Accounts.onCreateUser(function(options, user) {
    //pass the surname in the options
        console.log(options.profile);
        user.profile = options.profile;
        return user;
    });
}*/

