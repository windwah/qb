
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
        $('#barcode').on('click', this.gotoScanBarcode);
    },

    onClick: function(){
        location.href = 'index.html';
    },

    gotoInputBarcode: function(){
        location.href = 'search.html#inputbarcode';
    },

    gotoScanBarcode: function(){
        location.href = 'search.html#scanbaarcode';
    }

};

$( document ).ready(function() {
    app.initialize();
});
