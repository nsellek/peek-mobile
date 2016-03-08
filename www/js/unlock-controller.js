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
	this.mainMenuPageId = $('#page-main-menu');
	this.$backBtn = $('#back-btn');
	this.$pictureSubmitBtn = $('#picture-submit-btn');
	this.$picErr = $('#pic-err');
};

Peek.UnlockController.prototype.takePicture = function(){
	navigator.camera.getPicture(getPhoto,null,{sourceType:1,destinationType:0,cameraDirection:1,quality:70});

	function getPhoto (data){
		var session = Peek.Session.getInstance().get();
		this.imageData = "data:image/jpeg;base64," + data;
		console.log(this.imageData);
		cameraPic.src = this.imageData;
		$.ajax({
			type: 'POST',
			url: 'https://boiling-everglades-46119.herokuapp.com/match.json',
			data: {api_key: session.sessionId, name: this.houseName, image: this.imageData},
			success: function(resp){
				$.mobile.loading('hide');
				if (resp.success === true){
					$.mobile.chamgePage(this.mainMenuPageId);
				} else {
					this.$picErr.html('<p>'+ resp.error + '</p>')
					this.$picErr.addClass('bi-ctn-err').slideDown();
				}
			},
			error: function(e){
				$.mobile.loading('hide');
				this.$picErr.html('<p>Oops! Peek had a problem and could not log you on.  Please try again in a few minutes.</p>');
				this.$picErr.addClass('bi-ctn-err').slideDown();
			}
		});
	};
};

Peek.UnlockController.prototype.goBack = function(){
	var me = this;

	$.mobile.changePage(me.mainMenuPageId);
	cameraPic.src = null;
};
