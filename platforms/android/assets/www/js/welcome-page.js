var Peek = Peek || {};

Peek.Welcome = function(){
	this.session = null;
	this.first_name = null;
	this.last_name = null;
	this.$welcomeMessage = null;
};

Peek.Welcome.prototype.init = function(){
	var session = Peek.Session.getInstance().get();
	this.first_name = session.userProfileModel.first_name;
	this.last_name = session.userProfileModel.last_name;
	this.$welcomeMessage = $('.welcome-message');
}

Peek.Welcome.prototype.sayHello = function() {
	var me = this;

	me.$welcomeMessage.append(' ' + me.first_name + ' ' + me.last_name)
}