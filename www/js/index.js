$( document ).ready(function() {
  if(!localStorage.getItem('lang')){
     localStorage.setItem('lang','en');
  }
  if(localStorage.getItem('marzoni_version') == marzoni.marzoni_version){
    gotoSearch();
    return;
  }
    $('.bxslider').show();
    $('.bxslider').bxSlider({
      mode: 'horizontal',
      captions: false,
      infiniteLoop: false,
      hideControlOnEnd: true,
      touchEnabled:true,
      preventDefaultSwipeY:true
    });
    localStorage.setItem('marzoni_version',marzoni.marzoni_version);
    $('.btn-skip').on('click', gotoSearch);
});

function gotoSearch(){
    location.href = 'search.html';
}