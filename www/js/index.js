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

$(document).delegate('#page-signin', 'pagebeforecreate', function(){
  app.signInController.init();

  app.signInController.$signInBtnSubmit.off('tap').on('tap',function(){
    app.signInController.onSignInCommand();
  });
});

$(document).delegate('#page-main-menu', 'pagebeforecreate', function(){
  app.signOutController.init();
  app.welcome.init();

  retrieveHouses();
  app.welcome.sayHello();
  lockHouse();
  app.signOutController.$signOutBtnSubmit.off('tap').on('tap', function(){
    app.signOutController.onSignOutCommand();
  });
});

$(document).delegate('#page-unlock-house', 'pagedeforecreate', function(){
  

});

function retrieveHouses(){
  var session = Peek.Session.getInstance().get();
  console.log("retrieving.");
  for (var i = 0; i < session.houses.length; i++){
    console.log('Iterating');
    $('#list-house').append('<h3 class="house-title"> '+ session.houses[i].name +' </h3><div class="ui-grid-a"><div class="ui-block-a"><a data-transition="pop" data-postion-to="window" id="'+ session.houses[i].id +'" class="ui-btn ui-btn-a mc-top-margin-1-5 ui-corner-all lock-house-button">lock house</a></div><div class="ui-block-b"><a data-transition="pop" data-postion-to="window" id="'+ session.houses[i].id +'" class="ui-btn ui-btn-a mc-top-margin-1-5 ui-corner-all unlock-house-button">unlock house</a></div></div>');
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
        url: 'http://localhost:3000/lock'
      });
    } else if (target.attr('class') === "ui-btn ui-btn-a mc-top-margin-1-5 ui-corner-all unlock-house-button"){
      console.log('unlock');
      $.mobile.changePage($('#page-unlock-house'));
    }
  });
};















