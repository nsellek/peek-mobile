var Peek = Peek || {};

Peek.UnlockController = function(){
	this.$cameraBtn = null;
	this.$backBtn = null;
	this.mainPage = null;
	this.imageData = null;
	this.$pictureSubmitBtn = null;
	this.houseName = null;
};

Peek.UnlockController.prototype.init = function(){
	this.mainMenuPageId = $('#page-main-menu');
	this.$backBtn = $('#back-btn');
	this.$cameraBtn = $('#camera-btn');
	this.$pictureSubmitBtn = $('#picture-submit-btn');
	this.imageData = cameraPic.src;
};

Peek.UnlockController.prototype.takePicture = function(){
	navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,destinationType:0,cameraDirection:1,quality:80});

	function uploadPhoto (data){
		var session = Peek.Session.getInstance().get();
		console.log(this.imageData);
		cameraPic.src = "data:image/jpeg;base64," + data;
	};
};

Peek.UnlockController.prototype.goBack = function(){
	var me = this;

	$.mobile.changePage(me.mainMenuPageId);
	cameraPic.src = null;
};

Peek.UnlockController.prototype.sendPicture = function(){
	var session = Peek.Session.getInstance().get();
	console.log(this.houseName);
	$.mobile.loading('show');
	$.ajax({
		type: 'POST',
		url: 'https://boiling-everglades-46119.herokuapp.com/match.json',
		data: {api_key: session.sessionId, name: this.houseName, image: this.imageData},
		success: function(resp){
			$.mobile.loading('hide');
			$.mobile.chamgePage(this.mainMenuPageId);
		}
	});
};