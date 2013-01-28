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
}).call(jQuery);
