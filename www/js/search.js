var app = {
    
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        var _H = $(document).height();
        var _W = $(document).width();
        $('#search').on('click', this.gotoInputBarcode);
        $('#btnSearch').on('click',this.getItem);
		$('#book').on('click', this.gotoInputBook);
        $('#btnBookSearch').on('click',this.getBookLocation);
        $('#inputbarcode .left_back').on('click', this.gotoSelect);
        $('#item_detail .left_back').on('click', this.gotoSelect);
        $('#book_result .left_back').on('click', this.gotoSelect);
        $('#input_book .left_back').on('click', this.gotoSelect);
        $('.right_cam').on('click', this.scan);
        $('#barcode').on('click', this.scan);
        $('.right_keyboard').on('click', this.gotoInputBarcode);
        $('.item_image').width(_W);
        $('.bxslider').width(_W);
        $('.btn-lang').on('click', this.changeLang);
        slider = $('.bxslider').bxSlider({
          mode: 'horizontal',
          captions: false,
          infiniteLoop: false,
          hideControlOnEnd: true,
          touchEnabled:true,
          preventDefaultSwipeY:true,

        }); 

        var lang = localStorage.getItem('lang');
		lang = !!lang ? lang : "en";
        chaneLanguage(lang,refreshLang );  
        $('.btn-lang[item-data="'+lang+'"]').addClass('hl');
    },


    onClick: function(){
        location.href = 'search.html';
    },

    gotoSelect: function(){
        location.href = 'search.html#select';
    },

    gotoInputBarcode: function(){
        $('#txtSearch').val('');
        location.href = 'search.html#inputbarcode';
    },

    gotoScanBarcode: function(){
        location.href = 'search.html#scanbaarcode';
    },

    gotoItemDetail: function(){
        location.href = 'search.html#item_detail';
    },

	gotoBookResult: function(){
        location.href = 'search.html#book_result';
    },

	gotoInputBook: function(){
		location.href = 'search.html#input_book';
	},
	
    changeLang: function (e){
      $('.btn-lang').removeClass('hl');
      $(e.target).addClass('hl');
      var lang = $(e.target).attr('item-data');
      chaneLanguage(lang,refreshLang );
    },

    getItem: function(){
        var data = {i: $('#txtSearch').val()};
        var url = marzoni.serverUrl + '/qbservice/get_item.php';

        $.ajax({
          dataType: "json",
          url: url,
          data: data,
          crossDomain: true,
        })
        .done(function( json ) {
            app.refreshItem(json);
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    },

    refreshItem: function(json){
        var _H = $(document).height();
        var _W = $(document).width();
        $('#item_found').hide();
        $('#item_not_found').hide();
        $('#item_icon img').hide();
        $('[item-data="outofstock"]').hide();
		$('.outofstock').hide();
        if(!json['error']){
            $('.bxslider').show();
			var itemRemarks = nl2br(json.remarks.join("<br>").replace(/;/gi,"<br>"));
			$('[item-data="item_number"]').html(json.item_number);
			$('[item-data="item_name"]').html(json.full_name);
			$('[item-data="pd_name"]').html(json.pd_name);
			$('[item-data="composition"]').html(json.composition.join("<br>"));
			$('[item-data="width"]').html(json.width);
			$('[item-data="weight"]').html(json.weight);
			$('[item-data="colour"]').html(refreshStrLang(json.colour.join("<br>")));
			$('[item-data="style"]').html(refreshStrLang(json.style.join("<br>")));
			$('[item-data="location"]').html(json.location.join("<br>"));
			$('[item-data="remarks"]').html(itemRemarks);
			$('[item-data="qtyLv"]').removeClass('lv_red').removeClass('lv_yellow').removeClass('lv_green');
			
            if(json.qty == 0 || !json.active ){
              $('[item-data="qtyLv"]').addClass('lv_red');
              $('.outofstock').show();
	    }else if( itemRemarks.toUpperCase().match(/TEMPORARY OUT OF STOCK/gi) != null){
                $('[item-data="qtyLv"]').addClass('lv_yellow');	
		$('[item-data="remarks"]').show();
	    }else if(json.qty <= marzoni.minQty){
                $('[item-data="qtyLv"]').addClass('lv_red');
		$('.outofstock').show();
	    }else{
                $('[item-data="qtyLv"]').addClass('lv_green');
	    }
			$('.bxslider').html("");
			var loadingGif=$('<li><img src="img/loading.gif" /></li>');
			loadingGif.width(_W).height(_W);
			$('.bxslider').append(loadingGif);
            if(json.images.length == 0){
				$('.bxslider').append('<li><img src="img/product_detail/default.jpg" /></li>');
            }else{
				$('.item_image').css("background-image",'none');
				for(var i = 0; i < json.images.length; i++){
				  $('.bxslider').append('<li><img src="' + marzoni.serverUrl+json.images[i] +'" /></li>');			  
				}
            }

           $('#item_found').show(function(){
				$('.bxslider').height(_W);
				setTimeout(function(){ 
					loadingGif.remove();
					slider.reloadSlider(); 
				}, 1000);
              
           });

           $.each(json.function, function(key, value){
               $('[item-data="'+value.toLowerCase()+'"]').show();
           });
        }else{
           $('#item_not_found').show();
           $('.bxslider').hide();
        }
        app.gotoItemDetail();
    },

	getBookLocation: function(){
        var data = {i: $('#txtBookSearch').val()};
        var url = marzoni.serverUrl + '/qbservice/get_book_location.php';

        $.ajax({
          dataType: "json",
          url: url,
          data: data,
          crossDomain: true,
        })
        .done(function( json ) {
            app.refreshBookResult(json);
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    },
	
	refreshBookResult: function(json){
		var rdiv = $('#book_result_container');
		var srhBook = $('#txtBookSearch').val();
		rdiv.html('<div class="bookTitle">'+srhBook+'</div>');
		cc = $('<ul class="bookSearchContainer"></ul>');
		$.each(json, function(k,v){
			var ccNode = $('<li><table><tr><td><span>'+k+'&nbsp/<span></td><td class="book"></td></tr></table></li>');
			var ddNode = ccNode.find('.book');
			$.each(v, function(cck, ccv){
				var itNode = $('<span>'+ccv.itemCode+'<span>');
				if(ccv.letter_color)
					itNode.addClass(ccv.letter_color.toLowerCase());
				else
					itNode.addClass('drakbrown');
				ddNode.append(itNode);
			});
			cc.append(ccNode);
		});
		rdiv.append(cc);
        app.gotoBookResult();
    },
	
    scan: function() {
        cordova.plugins.barcodeScanner.scan(
          function (result) {
              if(!result.cancelled){
                  $('#txtSearch').val(result.text);
                  app.getItem();
              }
          }, 
          function (error) {
              alert("Scanning failed: " + error);
          }
       );
    },

};

$( document ).ready(function() {
    app.initialize();
    $.mobile.linkBindingEnabled = false;
});

function refreshLang(){
  $.each(langWord, function(key, value){
    $('[item-label="'+key+'"]').html(nl2br(value));
  });
}

function refreshStrLang(str){
  $.each(langWord, function(key, value){
    str = str.replace(key, value);
  });
  return str;
}

function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}
