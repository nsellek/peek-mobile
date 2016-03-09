var Peek = Peek || {};

Peek.UnlockController = function(){
	this.$backBtn = null;
	this.mainPage = null;
	this.imageData = null;
	this.$pictureSubmitBtn = null;
	this.houseName = null;
	this.$picErr = null;
};

Peek.UnlockController.prototype.init = function(){
	houseName = this.houseName;
	this.mainMenuPageId = $('#page-main-menu');
	this.$backBtn = $('#back-btn');
	this.$pictureSubmitBtn = $('#picture-submit-btn');
	this.$picErr = $('#pic-err');
};

Peek.UnlockController.prototype.takePicture = function(){
	navigator.camera.getPicture(getPhoto,null,{sourceType:1,destinationType:0,cameraDirection:1,quality:70});

	function getPhoto (data, houseName){
		var session = Peek.Session.getInstance().get();
		this.imageData = "data:image/jpeg;base64," + data;
		cameraPic.src = this.imageData;
		$.mobile.loading('show');
		$.ajax({
			type: 'POST',
			url: 'https://boiling-everglades-46119.herokuapp.com/match.json',
			data: {api_key: session.sessionId, name: this.houseName, image: this.imageData},
			success: function(resp){
				if (resp.success === true){
					$.mobile.loading('hide');
					$.mobile.chamgePage(this.mainMenuPageId);
				} else {
					$.mobile.loading('hide');
					Peek.UnlockController.$picErr.html('<p>'+ resp.error +'</p>');
					Peek.UnlockController.$picErr.addClass('bi-ctn-err').slideDown();
				}
			}
		});
	};
};

Peek.UnlockController.prototype.goBack = function(){
	var me = this;

	$.mobile.changePage(me.mainMenuPageId);
	cameraPic.src = null;
};
