$(document).ready(function () {

  function sidebarOverlay(index, opacity) { //  затемнення фону при висуванні меню з категоріями товарів
    $('.overlay').css("z-index", index);
    $('.overlay').css("opacity", opacity);
  }

  function priceFilterLeaving(move) { //  виїзджаючий ціновий фільтер фільтер
    $('.filter__box').css("left", move);
  }

  function leftBarLeaving(move) { //  виїзджаючий ціновий фільтер фільтер
    $('.left__bar').css("left", move);
  }

  function priceFilterAppend() { //  виїзджаючий ціновий фільтер фільтер
    var menu = $(".category");
    $('.list__link nav li').click(function () { // клік по  контейнеру підкатегорії
      if (!$('.filter__box').hasClass('openDone')) {
        $('.filter__box').addClass('openDone');
        menu.hide(); // ховає меню з категоріями
        priceFilterLeaving(0); // виїзджає блок з ціновим фільтром
      } else {
        $('.filter__box').removeClass('openDone');
      }
    });
  }

  $('.title__box').click(function () {
    $(this).toggleClass('open');
    $(this).next('div.list__link').toggleClass('open');
  }); // розгортання підкатегорій

  $('.side-bar__mobile').click(function () {
    var menu = $(".category");
    menu.show();
    priceFilterLeaving(-999); //  ховає  ціновий фільтер 
    sidebarOverlay(1, 0.4); //  затемнення фону при висуванні меню з категоріями товарів
    if (!$('.side-bar__mobile').hasClass('openDone')) {
      $('.side-bar__mobile').addClass('openDone');
      leftBarLeaving(0); // виїзджає блок left__bar
      if (window.matchMedia('(max-width: 768px)').matches) { // застосовується тільки при екранах менше 768рх
        if ($('.side-bar__mobile').hasClass('openDone')) {
          priceFilterAppend();
        }
      }
    } else {
      $('.side-bar__mobile').removeClass('openDone');
      leftBarLeaving(-999);
    }
  }); // виїжаюче меню  

  $('.side-bar__mobile').click(function () {
    $('.side-bar__trigger span:nth-child(1)').toggleClass('first');
    $('.side-bar__trigger span:nth-child(2)').toggleClass('middle');
    $('.side-bar__trigger span:nth-child(3)').toggleClass('last');
  }); //перетворення бургер меню на хрестик і навпаки

  $(document).mouseup(function (e) { // событие клика по веб-документу
    var burger = $(".side-bar__mobile"); // тут указываем клас элемента
    var menu = $(".left__bar"); // тут указываем клас элемента
    if (!burger.is(e.target) && // если клик был не по нашему блоку
      burger.has(e.target).length === 0 &&
      menu.has(e.target).length === 0) { // и не по  дочерним элементам menu
      if (window.matchMedia('(max-width: 768px)').matches) { // застосовується тільки при екранах менше 768рх
        $('.side-bar__mobile').removeClass('openDone');
        if (!$('.sign').hasClass('openDone') && !$('.basket__box').hasClass('open')) {
        sidebarOverlay(-1, 0); //  затемнення фону пропадає
        }
        leftBarLeaving(-999); // заїзджає блок left__bar
        $('.side-bar__trigger span:nth-child(1)').removeClass('first'); // видаляємо класи щоб схестик знову перетворився на лінії при кліку в любому місці документу
        $('.side-bar__trigger span:nth-child(2)').removeClass('middle'); // видаляємо класи щоб схестик знову перетворився на лінії при кліку в любому місці документу
        $('.side-bar__trigger span:nth-child(3)').removeClass('last'); // видаляємо класи щоб схестик знову перетворився на лінії при кліку в любому місці документу
      }
    }
  }); // для того щоб  side-bar згортався при кліку в любому місці документу 

});