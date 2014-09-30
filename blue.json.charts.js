/**
 * @file blue.json.charts.js
 * @version 0.1
 * @website http://bluejson.com
 * @author Yogesh Kumar
 * @date 30-Sep-2014
 */

(function(){
	var win = this;
	var oldBlue = win.blue;
	
	/**
	 * @description: Create a blue object.
	 */
	var blue = function(obj) {
		if (obj instanceof blue) return obj;
		if (!(this instanceof blue)) return new blue(obj);
		this.object = obj;
	};
	/**
	 * library details
	 */
	blue.VERSION = '0.1';
	blue.AUTHOR='Yogesh Kumar';
	blue.WEBSITE='http://bluejson.com';
	
	/**
	 * @description: if object blue conflict with other object 
	 */
	blue.noConflict = function() {
		win.bule = oldBlue;
		return this;
	};
	
	win.blue = blue;
}).call(this)
