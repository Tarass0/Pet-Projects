$(document).ready(function () {
  $('.menu-trigger').click(function () {
    $('.wrap .navbar ').slideToggle(100);
  }); //end slide toggle

  $(window).resize(function () {
    if ($(window).width() > 768) {
      $('nav ul').removeAttr('style');
    }
  }); //end resize для для розширення екрану менше 768px

  $('.menu-trigger').click(function () {
    $('.menu-trigger span:nth-child(1)').toggleClass('first');
    $('.menu-trigger span:nth-child(2)').toggleClass('middle');
    $('.menu-trigger span:nth-child(3)').toggleClass('last');
  }); //перетворення ліній на хрестик і навпаки

  $(document).mouseup(function (e) { // событие клика по веб-документу
    var burger = $(".menu-trigger"); // тут указываем клас элемента
    var menu = $(".navbar"); // тут указываем клас элемента
    if (!burger.is(e.target) // если клик был не по нашему блоку
      &&  burger.has(e.target).length === 0) {// и не по его дочерним элементам
      if (window.matchMedia('(max-width: 768px)').matches) { // для для розширення екрану менше 768px
        menu.hide(); // скрываем его
        $('.menu-trigger span:nth-child(1)').removeClass('first'); // видаляємо класи щоб схестик знову перетворився на лінії
        $('.menu-trigger span:nth-child(2)').removeClass('middle'); // видаляємо класи щоб схестик знову перетворився на лінії
        $('.menu-trigger span:nth-child(3)').removeClass('last'); // видаляємо класи щоб схестик знову перетворився на лінії
      }
    }
  });
}); //end ready