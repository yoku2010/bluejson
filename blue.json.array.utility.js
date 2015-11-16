/**
 * @file blue.json.array.utility.js
 * @version 0.1
 * @website http://bluejson.com
 * @author Yogesh Kumar
 */

(function(){
	var win = this;
	var oldBlue = win.blue;

	/**
	 * @description Create a blue object.
	 */
	var blue = function(obj) {
		if (obj instanceof blue) return obj;
		if (!(this instanceof blue)) return new blue(obj);
		this.object = obj;
	};
	/**
	 * library details
	 */
	blue.VERSION = "0.1";
	blue.AUTHOR="Yogesh Kumar";
	blue.WEBSITE="http://bluejson.com";

	/**
	 * @description if object blue conflict with other object
	 */
	blue.noConflict = function() {
		win.bule = oldBlue;
		return this;
	};

	// Array Prototyping store in a variable
	var ArrProto = Array.prototype;

	/**
	 * @description return the first element of Array
	 * @param N/A
	 */
	ArrProto.first = function(){
		return this.initial(0);
	};

	/**
	 * @description returns the passed index element of Array
	 * @param index: valid index of Array
	 */
	ArrProto.initial = function(index){
		return this.length > index && this[index] || null;
	};

	/**
	 * @description returns the rest of the elements which you have been passed
	 * @param index: valid index of Array
	 */
	ArrProto.rest = function(index){
		return this.slice(index).concat(this.slice(index + 1));
	};

	/**
	 * @description returns the status of emptness
	 * @param N/A
	 */
	ArrProto.isEmpty = function(){
		return this.length > 0 && true || false;
	};

	/**
	 * @description returns copy of Array
	 * @param N/A
	 */
	ArrProto.copy = function(){
		return this.slice();
	};



	win.blue = blue;
}).call(this);
