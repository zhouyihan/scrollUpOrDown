(function(){
	var abc=100;
	function TreeView(cfg){
		this.a=cfg.a;
		this.b=cfg.b;
	}
	TreeView.prototype={
		c:function(){abc*=2;},
		d:function(){abc/=2;}
	}
	window.TreeView=TreeView;
})()
