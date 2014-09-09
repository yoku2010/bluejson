/**
 * @file blue.json.string.utility.js
 * @version 0.1
 * @website http://bluejson.com
 * @author Yogesh Kumar
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
	
	/**
	 * @description: Define all regular expression
	 */
	blue.regx = {
		slugifyStrip:/[^\w\s-]/g,
		slugifyHyphenate: /[-\s]+/g
	};
	
	/**
	 * @description: string slugify
	 * @param: String to slugify
	 */
	blue.slugify=function(s){
		return s.slugify()
	};
	// String Prototyping store in a variable
	var StrProto = String.prototype;
	
	/**
	 * @description: make a string usable in a URL or filename. "Slugify" a string so it has only alphanumeric and hyphen characters. Useful for URLs and filenames. Transform text into a URL slug. Replaces whitespaces with dashes and removes non alpha-numeric characters.
	 */
	StrProto.slugify=function(){
		return this.replace(blue.regx.slugifyStrip, '').trim().replace(blue.regx.slugifyHyphenate, '-').toLowerCase();
	}
	
	/**
	 * @description: repeat any given number of times
	 */
	StrProto.repeat= function(n){
		n = n || 1;
		return Array(n+1).join(this);
	}
	
	win.blue = blue;
}).call(this)
