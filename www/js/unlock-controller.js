var Peek = Peek || {};

Peek.UnlockController = function(){
	this.$backBtn = null;
	this.mainPage = null;
};

Peek.UnlockController.prototype.init = function(){
	this.mainMenuPageId = $('#page-main-menu');
	this.$backBtn = $('#back-btn', this.mainPage);
};

Peek.UnlockController.prototype.unlockCommand = function(){

};

Peek.UnlockController.prototype.goBack = function(){
	var me = this;

	$.mobile.changePage(me.mainMenuPageId);
};