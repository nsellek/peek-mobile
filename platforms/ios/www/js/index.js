/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
    if (window.cordova.logger){
      window.cordova.logger.__onDeviceReady();
    }
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

app.initialize();

app.signInController = new Peek.SignInController();
app.signOutController = new Peek.SignOutController();
app.welcome = new Peek.Welcome();
app.unlockController = new Peek.UnlockController();
// app.lockController = new Peek.LockController();


$(document).on('pagecontainerbeforeshow', function(event, ui){
  if (typeof ui.toPage == 'object'){
    switch (ui.toPage.attr('id')){
      case 'page-signin':
      // Reset signin form.
      app.signInController.resetSignInForm();
      break;
    }
  }
});

$(document).delegate('#page-signin', 'pagebeforecreate page:load', function(){
  app.signInController.init();
  console.log('loaded');
  app.signInController.$signInBtnSubmit.off('tap').on('tap',function(){
    console.log('signin clicked');
    app.signInController.onSignInCommand();
  });
});

$(document).delegate('#page-main-menu', 'pagebeforecreate page:load', function(){
  app.signOutController.init();
  app.welcome.init();

  retrieveHouses();
  app.welcome.sayHello();
  lockHouse();
  app.signOutController.$signOutBtnSubmit.off('tap').on('tap', function(){
    app.signOutController.onSignOutCommand();
  });
});

$(document).delegate('#page-unlock-house', 'pagebeforecreate page:load', function(){
  app.unlockController.init();

  app.unlockController.$backBtn.off('tap').on('tap', function(){
    app.unlockController.goBack();
  });

  app.unlockController.$pictureSubmitBtn.off('tap').on('tap', function(){
    app.unlockController.takePicture();
  });
});

function retrieveHouses(){
  var session = Peek.Session.getInstance().get();
  console.log("retrieving.");
  for (var i = 0; i < session.houses.length; i++){
    console.log('Iterating');
    $('#list-house').append('<h3 class="house-title">'+ session.houses[i].name +'</h3><div class="ui-grid-a"><div class="ui-block-a"><a data-transition="pop" data-postion-to="window" id="'+ session.houses[i].id +'" class="ui-btn ui-btn-a mc-top-margin-1-5 ui-corner-all lock-house-button">🔒</a></div><div class="ui-block-b"><a data-transition="pop" data-postion-to="window" id="'+ session.houses[i].id +'" class="ui-btn ui-btn-a mc-top-margin-1-5 ui-corner-all unlock-house-button">🔓</a></div></div>');
  }
}

function lockHouse(){
  $('#list-house').on('click', function(event){
    var target = $(event.target);
    console.dir(target.attr('class'));
    if (target.attr('class') === "ui-btn ui-btn-a mc-top-margin-1-5 ui-corner-all lock-house-button"){
      console.log('lock');
      $.ajax({
        type: 'get',
        url: 'https://boiling-everglades-46119.herokuapp.com/lock'
      });
    } else if (target.attr('class') === "ui-btn ui-btn-a mc-top-margin-1-5 ui-corner-all unlock-house-button"){
      console.log('unlock');
      app.unlockController.houseName = target.parents().eq(1).siblings('h3').html();
      console.log(app.unlockController.houseName);
      $.mobile.changePage($('#page-unlock-house'));
    }
  });
};















