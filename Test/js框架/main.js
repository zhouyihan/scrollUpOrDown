require.config({
	paths:{
		jquery:'jquery-1.7.2.min.js'
	}
});
require(['jquery','window'],function($,w){
	$("#a").click(function(){
		new w.Window().alert();
	})
});
