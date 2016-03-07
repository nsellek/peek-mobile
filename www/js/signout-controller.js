var Peek = Peek || {};

Peek.SignOutController = function(){
	this.$signOutBtnSubmit = null;
	this.logInPageId = null;
};

Peek.SignOutController.prototype.init = function(){
	this.$signOutBtnSubmit = $('#signout-btn-submit');
	this.logInPageId = $('#page-signin');
};

Peek.SignOutController.prototype.onSignOutCommand = function(){
	var me = this,
			session = Peek.Session.getInstance().get();

	$.mobile.loading('show');

	$.ajax({
		type: 'GET',
		url: 'https://calm-beach-58721.herokuapp.com/logout.json',
		data: 'api_key='+ session.sessionId,
		success: function(resp){

			$.mobile.loading('hide');
			console.dir(resp);
			if (resp.success === true){
				Peek.Session.getInstance().remove(session);

				Peek.Welcome.first_name = null;
				Peek.Welcome.last_name = null;
				$('#list-house').empty();
				$.mobile.changePage(me.logInPageId);
				location.reload();
				return;
			}
		},
		error: function(e){
			$.mobile.loading('hide');
			console.log(e);
		}
	});
};