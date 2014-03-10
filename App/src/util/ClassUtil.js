var ClassUtil = {
	extend : function(sub,base) {
		// Avoid instantiating the base class just to setup inheritance
		// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
		// for a polyfill
		sub.prototype =new base();
		// Remember the constructor property was set wrong, let's fix it
		sub.prototype.constructor = sub;
		// In ECMAScript5+ (all modern browsers), you can make the constructor property
		// non-enumerable if you define it like this instead
		// Object.defineProperty(sub.prototype, 'constructor', {
			// enumerable : false,
			// value : function(){
				// var args = Array.prototype.slice.call(arguments, 1);
				// console.log(args);
				// base.apply(sub,args);
				// sub.apply(sub,args);
			// }
		// });
	},
	implement : function(newClass, baseClass) {
		this.proto(newClass, baseClass.prototype);
	},
	proto : function(_class, obj) {
		for (var name in obj) {
			_class.prototype[name] = obj[name];
		}
	}
};
