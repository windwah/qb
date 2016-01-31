
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
        $('#search_form .left_back').on('click', this.gotoSelect)
    },

    onClick: function(){
        location.href = 'index.html';
    },

    gotoInputBarcode: function(){
        location.href = 'search.html';
    },

    gotoSelect: function(){
        location.href = 'select.html';
    },

    getItem: function(){
        var data = {i: $('#txtSearch').val()};
        var url = 'http://localhost:8086/qbservice/getItem.php';

        $.getJSON( url, data)
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
    }
};

$( document ).ready(function() {
    app.initialize();
});
