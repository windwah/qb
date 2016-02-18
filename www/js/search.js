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
        $('.right_cam').on('click', this.scan);
        $('#barcode').on('click', this.scan);
        $('.right_keyboard').on('click', this.gotoInputBarcode);
        $('.item_image').height(_H*0.35);
        
    },

    onClick: function(){
        location.href = 'index.html';
    },

    gotoSelect: function(){
        location.href = 'index.html#select';
    },

    gotoInputBarcode: function(){
        location.href = 'index.html#inputbarcode';
    },

    gotoScanBarcode: function(){
        location.href = 'index.html#scanbaarcode';
    },

    gotoItemDetail: function(){
        location.href = 'index.html#item_detail';
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
           $('[item-data="ref"]').html(json.ref);
           $('[item-data="location"]').html(json.location);
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
        location.href = 'index.html#select';
        console.log('scanning');
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 

            $('#txtSearch').val(result.text);
            app.getItem();

        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    },

    encode: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );

    }
};

$( document ).ready(function() {
    app.initialize();
});
