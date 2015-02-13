
$(document).ready(function(){

	var _arr      	   = [ { pages: ["#page1"] } , { pages: ["#page2" , "#page2-1" , "#page2-2"] } ,{ pages: ["#page3" , "#page3-1" , "#page3-2", "#page3-3" ] }, { pages: ["#page4"] } , { pages: ["#page5"] } ];
	var _count    	   = 0;
	var _countSub 	   = 0;
	
	var itemToChange = null;
	var itemToReplace = null;	
	
	var content = ""; // IE/Firefox apenas
	var navegador = $.browser // IE/Firefox apenas
	
	$("body").swipe({
		swipe:function( e , direction ){
			if(direction == "left"){
				if(_count + 1 < _arr.length){
					paginate( true );
				}	
			}else{
				if(_count > 0){
					paginate( false );
				}
			}
		}
	});	
	
	$(document).keydown( function( event ) {
		switch(event.keyCode)
		{
			case 37:
				if(_count > 0){
					paginate(false);
				}
			break;
			
			case 39:
				if(_count + 1 < _arr.length){
					paginate(true);
				}
			break;
		}
	});
	
	itemHide( _arr );
	replacePage( _arr[_count].pages[_countSub], null );
	
	function itemHide( object ){
		for(var i = 0; i < object.length; i++){
			for(var j = 0; j < object[i].pages.length; j++){
				$(object[i].pages[j]).hide();
			}
		}
	}
	
	function paginate( isNext ) {
		
		itemToReplace =  _arr[_count].pages[_countSub];
		
		if( isNext ) { 
			if(_count < (_arr.length - 1)) { 
				if( (_arr[_count].pages.length > 1) && (_countSub < (_arr[_count].pages.length - 1)) ) 
				{ 
					_countSub++;
				} else { 
					_countSub = 0;
					_count++;
				}
			} else { 
				//console.log("Fim dos items");
			}
		} else { 
			if( _count > 0 ) { 
			
				itemToReplace =  _arr[_count].pages[_countSub];
			
				if(_countSub > 0 ) { 
					_countSub--;
				} else { 
					_count--;
					if(_arr[_count].pages.length > 1 ) _countSub = _arr[_count].pages.length - 1;
				}
			} else { 
				//console.log("Começo dos items");
			}
		}
		
		itemToChange =  _arr[_count].pages[_countSub];
		
		//console.log("itemToReplace " + itemToReplace);
		//console.log("itemToChange " + itemToChange);
		
		if( _countSub > 0){
			if( isNext ){
				if(_countSub == 1 ){
					replacePage( itemToChange, null );
				}else{
					replacePage( itemToChange, itemToReplace );
				}
			}else{
				if(_countSub + 1 == _arr[_count].pages.length ){
					replacePage( _arr[_count].pages[0], itemToReplace );
					replacePage( itemToChange, itemToReplace );
				}else{
					replacePage( itemToChange, itemToReplace );
				}
			}
		}else{
			if( isNext ){
				if( _arr[_count].pages.length > 1 ){
						//replacePage( itemToChange, itemToReplace );
						replacePage( itemToChange, _arr[_count - 1].pages[0]  );
						paginate( isNext );
				}else{
					replacePage( itemToChange, _arr[_count - 1].pages[0]  );
					//replacePage( itemToChange, itemToReplace );
				}
			}else{
				if( _arr[_count].pages.length > 1 ){
					replacePage( _arr[_count - 1].pages[0], _arr[_count].pages[0] );
					paginate( isNext );
				}else{
					replacePage( itemToChange, itemToReplace );
				}
			}
		}
		
	}
	
	var analyticsAnt = ""; // GOOGLE ANALYTICS
	
	function replacePage( itemToChange, itemToReplace ){
		$(itemToChange).fadeIn(200);
		
		/*IE/Mozilla apenas */
		if(navegador.msie == true || navegador.mozilla == true){
			content = $(itemToChange).html();
			$(itemToChange).html("");
			$(itemToChange).html(content);
			//console.log("É IE/Mozilla");
		}
		
		if(itemToReplace != null){
			$(itemToReplace).fadeOut(200);  
		}			
		if((itemToChange == "#page2") || (itemToChange == "#page3") || (analyticsAnt == itemToChange)){
		}else{
			// GOOGLE ANALYTICS
			_gaq.push(['_trackPageview', window.location.pathname + itemToChange.replace("#", "")]);
			analyticsAnt = itemToChange;
		}
	}
	
});




