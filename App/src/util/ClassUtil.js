var ClassUtil = {
	extend : function(newClass, baseClass) {
		newClass.prototype = new baseClass();
		newClass.constructor = newClass;
	},
	implement:function(newClass, baseClass){
		this.extend(newClass, baseClass);
	},
	proto : function(_class, obj) {
		for (var name in obj) {
			_class.prototype[name] = obj[name];
		}
	}
};
