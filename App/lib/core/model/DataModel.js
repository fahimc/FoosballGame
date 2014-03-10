var DataModel=(function(){
	
	
	function DataModel(){};
	
	DataModel.prototype=
	{
		data:null,
		setData:function(data){
			
			this.data=data;
		},
		getCopyByID:function(name){
			return this.data[name];
		}
	};
	
	return new DataModel();
})();
