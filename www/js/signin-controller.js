var Peek = Peek || {};

Peek.SignInController = function(){

	this.$signInPage = null;
	this.$signInBtnSubmit = null;
	this.$txtEmailAddress = null;
	this.$txtPassword = null;
	this.$ctnErr = null;
	this.mainMenuPageId = null;
};

Peek.SignInController.prototype.init = function(){
	this.$signInPage = $('#page-signin');
	this.mainMenuPageId = $('#page-main-menu');
	this.$signInBtnSubmit = $('#signin-btn-submit', this.$signInPage);
	this.$ctnErr = $('#ctn-err', this.$signInPage);
	this.$txtEmailAddress = $('#txt-email-address', this.$signInPage);
	this.$txtPassword = $('#txt-password', this.$signInPage);
};

Peek.SignInController.prototype.emailAddressIsValid = function (email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

Peek.SignInController.prototype.resetSignInForm = function(){
	var invisibleStyle = 'bi-invisible',
	invalidInputStyle = 'bi-invalid-input';

	this.$ctnErr.html("");
	this.$ctnErr.removeClass().addClass(invisibleStyle);
	this.$txtEmailAddress.removeClass(invalidInputStyle);
	this.$txtPassword.removeClass(invalidInputStyle);
	this.$txtEmailAddress.val('');
	this.$txtPassword.val('');
};

Peek.SignInController.prototype.onSignInCommand = function() {
	var me = this,
	emailAddress = me.$txtEmailAddress.val().trim(),
	password = me.$txtPassword.val().trim(),
	invalidInput = false,
	invisibleStyle = 'bi-invisible',
	invalidInputStyle = 'bi-invalid-input';

	// Reset styles.
	me.$ctnErr.removeClass().addClass(invisibleStyle);
	me.$txtEmailAddress.removeClass(invalidInputStyle);
	me.$txtPassword.removeClass(invalidInputStyle);

	// Flag each invalid field.
	if (emailAddress.length === 0){
		me.$txtEmailAddress.addClass(invalidInputStyle);
		invalidInput = true;
	}
	if (password.length === 0){
		me.$txtPassword.addClass(invalidInputStyle);
		invalidInput = true;
	}

	// Make sure that all the required fields have values.
	if (invalidInput){
		me.$ctnErr.html("<p>Please enter all the required fields.</p>");
		me.$ctnErr.addClass('bi-ctn-err'.slideDown);
		return;
	}
	if (!me.emailAddressIsValid(emailAddress)){
		me.$ctnErr.html("<p>Please enter a valid email address.</p>");
		me.$ctnErr.addClass('bi-ctn-err').slideDown();
		me.$txtEmailAddress.addClass(invalidInputStyle);
		return;
	}

	$.mobile.loading('show');

	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/login.json',
		data: {email: emailAddress , password: password},
		success: function(resp){
			console.dir(resp.extras.houses);
			$.mobile.loading('hide');

			if (resp.success === true){
				// Create session.
				Peek.Session.getInstance().set({
					userProfileModel: resp.extras.userProfileModel,
					sessionId: resp.extras.sessionId,
				});
				// Go to main menu
				// $.mobile.navigate(me.mainMenuPageId);
				for (var i = 0; i < resp.extras.houses.length; i++){
					$('#list-house').append('<h3 class="house-title"> House Title</h3><div class="ui-grid-a"><div class="ui-block-a"><a data-transition="pop" data-postion-to="window" id="lock-house-button" class="ui-btn ui-btn-a mc-top-margin-1-5 ui-corner-all">lock house</a></div><div class="ui-block-b"><a data-transition="pop" data-postion-to="window" id="lock-house-button" class="ui-btn ui-btn-a mc-top-margin-1-5 ui-corner-all">unlock house</a></div></div>');
				}

				$.mobile.changePage(me.mainMenuPageId);
				return;
			} else {
					me.$ctnErr.html("<p>Invalid Email or Password. Please try again.</p>");
					me.$ctnErr.addClass('bi-ctn-err').slideDown();
					me.$txtEmailAddress.addClass(invalidInputStyle);
			}
		},
	error: function(e){
		$.mobile.loading('hide');
		console.log(e.message);
			// TODO: Use a friendlier error message below.
			me.$ctnErr.html("<p>Oops! Peek had a problem and could not log you on.  Please try again in a few minutes.</p>");
			me.$ctnErr.addClass('bi-ctn-err').slideDown();
		}
	});
};


























