/**
 * @file blue.json.jquery.utility.js
 * @version 0.1
 * @website http://bluejson.com
 * @author Yogesh Kumar
 */


(function () {
  "use strict";
  
  /**
   * @description get the updated selector
   */
  $.fn.refresh = function() {
    return $(this.selector);  // selector is the property of jquery
  };
  
  /**
   * @description slide and fade effect together
   */
  $.fn.slideFadeToggle = function(speed, easing, callback) {
    return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
  };
  
  /**
   * @description get parameter value from the url string
   */
  $.fn.getURLParameter = function() {
    return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
  }
}).call(jQuery);
