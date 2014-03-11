var ClassUtil = {
	extend : function(sub, base) {
		// Avoid instantiating the base class just to setup inheritance
		// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
		// for a polyfill
		sub.prototype = new base();
		// Remember the constructor property was set wrong, let's fix it
		// sub.prototype.constructor = function() {
		// var args = Array.prototype.slice.call(arguments, 1);
		// base.apply(sub, args);
		// sub.apply(sub, args);
		// };
		// In ECMAScript5+ (all modern browsers), you can make the constructor property
		// non-enumerable if you define it like this instead
		Object.defineProperty(sub.prototype, 'constructor', {
			enumerable : false,
			value : function() {
				
				
				base.apply(this, arguments);
				sub.apply(this, arguments);
			}
		});
		// var result;
		//
		// result = function() {
		//
		// base.apply(this, arguments);
		// sub.apply(this, arguments);
		// };
		//
		// result.prototype = Object.create(base.prototype, {});
		//
		// for (var key in sub.prototype) {
		// result.prototype[key] = sub.prototype[key];
		// }
		//
		// sub= result;
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
