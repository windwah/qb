
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
        $('#search').on('click', this.gotoInputBarcode);
        $('#btnSearch').on('click',this.getItem);
        $('#inputbarcode .left_back').on('click', this.gotoSelect);
        $('.right_cam').on('click', this.gotoScanBarcode);
        $('#barcode').on('click', this.scan);
        $('.right_keyboard').on('click', this.gotoInputBarcode);
        
    },

    onClick: function(){
        location.href = 'index.html';
    },

    gotoSelect: function(){
        location.href = 'select.html';
    },

    gotoInputBarcode: function(){
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
        var url = 'http://192.168.1.233:8086/qbservice/get_item.php';

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
           $('[item-data="item_name"]').html(json.full_name);
           $('[item-data="material"]').html(json.material);
           $('[item-data="size"]').html(json.size);
           $('[item-data="weight"]').html(json.weight);
           $('[item-data="color"]').html(json.color);
           $('[item-data="ref"]').html(json.ref);
           $('#item_found').show();

        }else{
           $('#item_not_found').show();

        }
        app.gotoItemDetail();
    },

    scan: function() {
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
