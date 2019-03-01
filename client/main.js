import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import './main.html';

import { Cities } from '/imports/api/lists';
import { Technologies } from '/imports/api/lists';
import { Companies } from '/imports/api/lists';
import { Vacancies } from '/imports/api/lists';
import { Images } from '/imports/api/lists';
global.Buffer = global.Buffer || require("buffer").Buffer; 

var buffer;
var finalTrans;

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/about');
Router.route('/services');
Router.route('/ourAdminPage');
Router.route('/', {
    name: 'home',
    template: 'home'
});





if(Meteor.isClient){


    Meteor.startup(function(){

    });  

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

            Accounts.createUser(options , function(err){
                if( err ) $('div#errors').html( err.message );
            });

            console.log(Meteor.users.find().fetch());

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
        }
    });

     Template.dashboard.events({
        'click .logout': function(event){
            event.preventDefault();
            Meteor.logout();
        }

    });

    Template.jobseekers.events({
        'click .login__labels_link': function (event) {
            event.preventDefault();

            $(".login__popup_both").addClass("login__popup");
            $(".login__popup_signin").css("display", "block");
            $("#overlay").css("display"," block");
        },
        'click #overlay': function (event) {
            event.preventDefault();

            $(".login__popup_both").removeClass("login__popup");
            $(".login__popup_signin").css("display", "none");
            $("#overlay").css("display"," none");
        }
    });

    Template.loginMenu.events({
        'click #loginMenuRegister': function (event) {
        
            event.preventDefault();

            $(".login__popup_signup").css("display", "block");
            $(".login__popup_signin").css("display", "none");

            $("#loginMenuRegister").css("color","#EEA079");
            $("#loginMenuSignIn").css("color","#33476F");
            $("#overlay").css("display"," block");
        },
        'click #loginMenuSignIn': function (event) {
           
            event.preventDefault();

            $("#loginMenuSignIn").css("color","#EEA079");
            $("#loginMenuRegister").css("color","#33476F");

            $(".login__popup_signup").css("display", "none");
            $(".login__popup_signin").css("display", "block");
            $("#overlay").css("display"," block");
        }
    });

    Template.jobseekers.helpers({
        'greetings': function(){
            return "Привіт, "+(Meteor.user().profile['surname']);
        }
    });
    Template.fileUpload.events({
        'change input[type="file"]' : function(event,template){ 
           var files=event.target.files;
            if(files.length===0){
                return;
            }
            var file = files[0];

            var reader = new FileReader(); //create a reader according to HTML5 File API

            reader.onload = function(event){          


                var image = event.target.result;

                console.log("image",image);
                var i = image.indexOf('base64,');
                buffer = Buffer.from(image.slice(i + 7), 'base64');

                finalTrans = buffer.toString('base64');


            }

            reader.readAsDataURL(file); //read the file as arraybuffer

        }
    });

    Template.ourAdminPage.onRendered(function () {
  
        if(!this._rendered) {
            this._rendered = true;
            }
    });
    
    Template.citiesList.helpers({
        'city' : function(){
            console.log(Cities.find().fetch());
            return Cities.find({}, { sort:  {cityName: 1}});
        } 
    });

    Template.ourAdminPage.events({
        
        'click #cityBtn ': function(event){
            event.preventDefault();
            var selectValue = $("#city").val();
            console.log(selectValue);
            Cities.insert({ cityName: selectValue });
            console.log(Cities.find().fetch());
        },
        'click #techBtn ': function(event){
            event.preventDefault();

            var selectValue = $("#tech").val();
            console.log(selectValue);
            Technologies.insert({ name: selectValue });
            console.log(Technologies.find().fetch());
        },
        'click #companiesBtn ': function(event){
            event.preventDefault();

            var selectName = $("#companyName").val();
            var selectSite = $("#companySite").val();
            var selectEmount = $("#companyEmount").val();
            var selectCity = $("#companyCities").val();
            console.log(selectName, selectSite, selectEmount, selectCity);
            alert("1finaltrans", finalTrans);
            Companies.insert({ name: selectName,
                             site: selectSite,
                             emount: selectEmount,
                             city: selectCity,
                             icon: finalTrans
                            });
        }
    });


    Template.companiesList.helpers({
        'company' : function(){
            return Companies.find({}, { sort:  {name: 1}});
        }
    });


    Template.companyItem.helpers({

        'icon' : function() {
            var id = this._id;
            var buffForTrans = Companies.findOne({ _id: id }).icon;
            
            var image = new Image();
            
            image.src = 'data:image/png;base64,'+buffForTrans;
            image.height = 32;
            // image.width = 32;
            return image.outerHTML;

        },
        'compCity' : function() {
            return Cities.find();
        }
    });
    Template.companyItem.events({
        'click .btn_edit': function(event)
        {
            
            var compId = this._id;
            Session.set('selectedCompany', compId);
            
            $(event.target).parents("tr").find("input").toggle();
            $(event.target).parents("tr").find("span").toggle();
            $(event.target).parents("tr").find("select").toggle();
            $(event.target).parents("tr").find(".btn_save").toggleClass("hidden unhidden");
            $(event.target).parents("tr").find(".btn_edit").toggleClass("hidden unhidden");
            $(event.target).parents("tr").find(".btn_cancel").toggleClass("hidden unhidden");
        },
         'click .btn_save': function(event)
        {
            event.preventDefault();
            var compId = Session.get('selectedCompany');
            $(event.target).parents("tr").find("input").toggle();
            $(event.target).parents("tr").find("span").toggle();
            $(event.target).parents("tr").find("select").toggle();
            $(event.target).parents("tr").find(".btn_save").toggleClass("hidden unhidden");
            $(event.target).parents("tr").find(".btn_edit").toggleClass("hidden unhidden");
            $(event.target).parents("tr").find(".btn_cancel").toggleClass("hidden unhidden");
            var compName = $("#" + compId).find("input").get(0).value;
            
            var compSite = $("#" + compId).find("input").get(1).value;
            var compEmount = $("#" + compId).find("input").get(2).value;
            var compCity = $("#" + compId).find("select").get(0).value;
            console.log(compName, compSite, compEmount, compCity);
            var confirm = window.confirm("Оновити дані про компанію?");
            if(confirm)
            {
                Companies.update(
                    {_id: compId}, 
                    {$set:
                        {name: compName,
                        site: compSite,
                        emount: compEmount,
                        city: compCity  

                        }
                    });
            }
        },
         'click .btn_cancel': function(event)
        {
            event.preventDefault();
            var compId = Session.get('selectedCompany');
            //alert(documentId);
           

            var confirm = window.confirm("Відмінити редагування?");

            if(confirm)
            {
                $(event.target).parents("tr").find("input").toggle();
                $(event.target).parents("tr").find("span").toggle();
                $(event.target).parents("tr").find("select").toggle();
                $(event.target).parents("tr").find(".btn_save").toggleClass("hidden unhidden");
                $(event.target).parents("tr").find(".btn_edit").toggleClass("hidden unhidden");
                $(event.target).parents("tr").find(".btn_cancel").toggleClass("hidden unhidden");
                
            }
        }

    });

};