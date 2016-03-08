var Peek = Peek || {};

Peek.UnlockController = function(){
	this.$cameraBtn = null;
	this.$backBtn = null;
	this.mainPage = null;
	this.imageData = null;
	this.$pictureSubmitBtn = null;
};

Peek.UnlockController.prototype.init = function(){
	this.mainMenuPageId = $('#page-main-menu');
	this.$backBtn = $('#back-btn');
	this.$cameraBtn = $('#camera-btn');
	this.$pictureSubmitBtn = $('#picture-submit-btn');
};

Peek.UnlockController.prototype.takePicture = function(){
	navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,destinationType:0,cameraDirection:1,quality:60});

	function uploadPhoto (data){
		this.imageData = "data:image/jpeg;base64," + data;
		cameraPic.src = this.imageData;
	};
};

Peek.UnlockController.prototype.goBack = function(){
	var me = this;

	cameraPic.src = null;
	$.mobile.changePage(me.mainMenuPageId);
};

Peek.UnlockController.prototype.sendPicture = function(){
	console.log(this.imageData);
};