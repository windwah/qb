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
        $('#inputbarcode .left_back').on('click', this.gotoSelect);
        $('#item_detail .left_back').on('click', this.gotoSelect);
        $('.right_cam').on('click', this.scan);
        $('#barcode').on('click', this.scan);
        $('.right_keyboard').on('click', this.gotoInputBarcode);
        $('.item_image').height(_H*0.38);
        
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

    getItem: function(){
        var data = {i: $('#txtSearch').val()};
        var url = marzoni.serverUrl + 'qbservice/get_item.php';

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
        $('#item_found').hide();
        $('#item_not_found').hide();
        if(!json['error']){
           $('[item-data="item_number"]').html(json.item_number);
           $('[item-data="item_name"]').html(json.full_name);
           $('[item-data="pd_name"]').html(json.pd_name);
           $('[item-data="material"]').html(json.material.join("; "));
           $('[item-data="size"]').html(json.size);
           $('[item-data="weight"]').html(json.weight);
           $('[item-data="color"]').html(json.color.join("; "));
           $('[item-data="ref"]').html(json.location);
            $('[item-data="qtyLv"]').removeClass('lv_red').removeClass('lv_yellow').removeClass('lv_green');
            if(json.qty < marzoni.minQty)
                $('[item-data="qtyLv"]').addClass('lv_red');
            else if( json.qty < marzoni.avgQty )
                $('[item-data="qtyLv"]').addClass('lv_yellow');
            else
                $('[item-data="qtyLv"]').addClass('lv_green');
            $('.item_image').css("background-image",'url("img/no-image-thumb.png"');

           $('#item_found').show();

        }else{
           $('#item_not_found').show();

        }
        app.gotoItemDetail();
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
