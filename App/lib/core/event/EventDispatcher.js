var EventDispatcher=(function(){
	
	function EventDispatcher(){
		this._events=[];
	};
	
	EventDispatcher.prototype=
	{
		_events : [],
		addEventListener : function(name, callback) {
			if(!this._events[name])this._events[name]=[];
			this._events[name].push(callback);
		},
		removeEventListener : function(name, callback) {
			if(!this._events[name])return;
			for(var a=0;a<this._events[name].length;a++)
			{
				if(this._events[name][a]==callback)
				{
					this._events[name].splice(a,1);
					return;
				}
			}
			
		},
		dispatchEvent:function(name){
			if(!this._events[name])return;
			for(var a=0;a<this._events[name].length;a++)
			{
				this._events[name][a]();
			}
		}
	};
	
	return EventDispatcher;
})();
