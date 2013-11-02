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
	
	
	/**
	 * @description call this function to debug your code (this will helpfull for developers)
	 */
	blue.debug = function(s) {
		if(console!=void 0 && console.log!=void 0) {
			console.log("[bule json debugger]");
			console.log(s);
		}
		else {
			alert(s);
		}
	};
	
	/**
	 * @description sum of array values 
	 * @param Array object
	 */
	blue.sum=function(a) {
		return a.sum()
	};
	
	// Array Prototyping store in a variable
	var ArrProto = Array.prototype;
	
	/**
	 * @description sum of array values and all values should be integer or string
	 * @param saparator: this will use when any array element's type is string (Default:",")
	 */
	ArrProto.sum = String.prototype.sum = function(separator){
		arr = this.split ? this.split(separator||',') : this;
		sum = 0;
		for (_i = 0, _len = arr.length; _i < _len; _i++) {
			x = arr[_i];
			sum += Number(x);
		}
		if(isNaN(sum)){
			error = "Upsupported Type, Array's Variable should be number or string";
			throw "Upsupported Type, Array's Variable should be number or string";
		}
		else
			return sum;
	};
	
	/**
	 * @description get the slice array from the array
	 * @param start: starting index (Default:0)
	 * @param end: ending index (Default:length of array)
	 * @param step: step index (Default:1)
	 */
	ArrProto.newSlice=function(start,end,step){
		// set default values
		if(start==void 0) start=0;
		else if(start<0) start=this.length+start;
		if(end==void 0) end=this.length;
		else if(end>this.length)end=this.length;
		else if(end<0) end=this.length+end;
		if(step==void 0) step=1;
		// declare variables
		var _slice=[],i;
		if(step>0)
			for(i=start;i<end;i+=step) _slice[_slice.length]=this[i];
		else if(step<0)
			for(i=start;i>end;i+=step) _slice[_slice.length]=this[i];
		else
			blue.debug("slice step cannot be zero");
		return _slice;
	};
	win.blue = blue;
}).call(this)
