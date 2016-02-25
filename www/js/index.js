$( document ).ready(function() {
    $('.bxslider').bxSlider({
      mode: 'horizontal',
      captions: false,
      infiniteLoop: false,
      hideControlOnEnd: true,
      touchEnabled:true,
      preventDefaultSwipeY:true
    });

    $('.btn-skip').on('click', gotoSearch);
});

function gotoSearch(){
    location.href = 'search.html';
}