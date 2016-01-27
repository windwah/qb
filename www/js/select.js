
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
        $('#search').on('click', this.gotoInputBarcode)
    },

    onClick: function(){
        location.href = 'index.html';
    },

    gotoInputBarcode: function(){
        location.href = 'search.html';
    },

};

$( document ).ready(function() {
    app.initialize();
});
