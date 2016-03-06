var Peek = Peek || {};

Peek.Session = (function () {
  var instance;
  function init() {
    var sessionIdKey = "Peek-session";
    return {
      // Public methods and variables.
      set: function (sessionData) {
        window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
      },
      get: function () {
        var result = null;
        try {
          result = JSON.parse(window.localStorage.getItem(sessionIdKey));
        } catch(e){}
          return result;
      },
      remove: function(sessionData) {
        window.localStorage.removeItem(sessionIdKey, JSON.stringify(sessionData));
      }
    };
  };
  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
}());