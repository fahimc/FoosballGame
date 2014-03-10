var Model=(function(){
	
	function Model(){
		this.data ={};
	};
	
	Model.prototype=
	{
		data:null,
		set:function(name,value){
			this.data[name]=value;
		},
		get:function(name){
			if(this.data[name]!=undefined)return this.data[name];
			return null;
		}
	};
	
	return Model;
})();
