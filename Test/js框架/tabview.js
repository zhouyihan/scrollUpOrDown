(function(){
	var abc=5;
	function TabView(cfg){
		this.a=cfg.a;
		this.b=cfg.b;
	}
	TabView.prototype={
		c:function(){abc++;},
		d:function(){abc--;}
	}
	window.TabView=TabView;
})()
