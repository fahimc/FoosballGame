var DataBinder = (function() {

	function DataBinder() {
	};

	DataBinder.prototype = {
		_dataModel : null,
		_binders : [],
		bind : function(model) {
			this._dataModel = model;

			this._binders = document.querySelectorAll("[data-bind]");
			this.setBinds();
		},
		setBinds : function() {
			var _this=this;
			var collection=[];
			for (var a = 0; a < this._binders.length; a++) {
				var prop = this._binders[a].getAttribute('data-bind');
				
				// var val = prop.split('.').reduce(this.toObj, this._dataModel);
				var d = this.getObj(prop, this._dataModel);
				
				//update dom
				if (d.obj[d.name])
					this._binders[a].innerHTML = d.obj[d.name];
				//set watcher
				if (d.obj)
					this.watch(d.obj, d.name, function(prop, oldval, val){return _this.onChange(d.obj, prop, oldval, val);});
				
				//update collection
				collection.push({
					elem:this._binders[a],
					obj:d.obj,
					name:d.name,
					prop:prop
				});
			}
			this._binders=collection;
		},
		toObj : function(obj, i) {
			return obj[i];
		},
		getObj : function(prop, obj) {
			var parts = prop.split('.');

			for (var a = 0; a < parts.length - 1; a++) {
				if (obj[parts[a]] != undefined)
					obj = obj[parts[a]];
			}

			return {
				obj : obj,
				name : parts.length ? parts[parts.length - 1] : prop
			};
		},
		watch : function(obj, prop, handler) {
			var oldval = obj[prop], newval = oldval, getter = function() {
				return newval;
			}, setter = function(val) {
				oldval = newval;
				return newval = handler.call(obj, prop, oldval, val);
			};
			if (
			delete obj[prop]) {// can't watch constants
				if (Object.defineProperty)// ECMAScript 5
					Object.defineProperty(obj, prop, {
						get : getter,
						set : setter
					});
				else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) {// legacy
					Object.prototype.__defineGetter__.call(obj, prop, getter);
					Object.prototype.__defineSetter__.call(obj, prop, setter);
				}
			}
		},
		unwatch : function(obj,prop) {
			var val = obj[prop];
			delete obj[prop];
			// remove accessors
			obj[prop] = val;
		},
		onChange : function(obj, prop, oldval, val) {
			if( oldval!=val)this.updateBindedElem(obj, prop,val);
			return val;
		},
		updateBindedElem:function(obj,prop,val){
			for (var a = 0; a < this._binders.length; a++) {
				if(this._binders[a].obj==obj && prop ==this._binders[a].name)
				{
					this._binders[a].elem.innerHTML = val;
					return;
				}
			}
		},
		update:function(){
			for (var a = 0; a < this._binders.length; a++) {
				var d = this.getObj(this._binders[a].prop, this._dataModel);				
				//update dom
				if (d.obj[d.name])
					this._binders[a].elem.innerHTML = d.obj[d.name];
					this._binders[a].obj[this._binders[a].name]=d.obj[d.name];
			}
		}
	};

	return new DataBinder();
})();
