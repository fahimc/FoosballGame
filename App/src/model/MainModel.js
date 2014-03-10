var MainModel=(function(){
	
	function MainModel(){
		this._currentView ="";
	};
	
	ClassUtil.extend(MainModel,EventDispatcher);
	ClassUtil.implement(MainModel,Model);
	
	var prototype=
	{
		viewCollection:[],
		setCurrentView:function(viewName){
			this._currentView=viewName;
		},
		getCurrentView:function(){
			return this._currentView;
		},
		addView:function(name,view){
			this.viewCollection[name]=view;
		},
		getViewByName:function(name){
			return this.viewCollection[name];
		},
		removeView:function(view){
			for(var a=0;a<this.viewCollection.length;a++){
				if(this.viewCollection[a]==view)
				{
					this.viewCollection.splice(a,1);
					return ;
				}
			}
		}
	};
	
	ClassUtil.proto(MainModel,prototype);
	
	return MainModel;
})();
