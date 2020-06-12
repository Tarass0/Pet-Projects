$(document).ready(function () {

var authorization = $('.authorization'); 
authorization.hide(); // по замовчування  модальне вікнно авторизації скрите

function closeModalAuthorization(authorization){ // скриває модальне вікнно авторизації
  if ($('.sign').hasClass('openDone')) {
    $('.sign').removeClass('openDone');
    $('.authorization').removeClass('openDone');
    authorization.hide();
  }  
}

function blockScroll(state){ // блокує скрол 
  $('body').css("overflow", state);
  $('html').css("overflow-y", state); 
}

function sidebarOverlay(index, opacity) { //  затемнення фону при відкритті модального вікнна авторизації
  $('.overlay').css("z-index", index);
  $('.overlay').css("opacity", opacity);
}

    $('.sign').click(function () {
      if (!$('.sign').hasClass('openDone')) {
        $('.sign').addClass('openDone');
        $('.authorization').addClass('openDone');
        authorization.show();
        sidebarOverlay(1, 0.7); //  затемнення фону
        blockScroll('hidden'); // блокує скрол
      }  
    });

    $('.authorization_close').click(function () {
      closeModalAuthorization(authorization);// скриває модальне вікнно авторизації
      sidebarOverlay(-1, 0); //  затемнення фону пропадає
      blockScroll('visible'); // розблоковує скрол
    });

    $('.form__sign-in').click(function () {
      closeModalAuthorization(authorization);// скриває модальне вікнно авторизації
      sidebarOverlay(-1, 0); //  затемнення фону пропадає
      blockScroll('visible'); // розблоковує скрол
    });

    $('.registration a').click(function () {
      closeModalAuthorization(authorization);// скриває модальне вікнно авторизації
      sidebarOverlay(-1, 0); //  затемнення фону пропадає
      blockScroll('visible'); // розблоковує скрол
    });

});