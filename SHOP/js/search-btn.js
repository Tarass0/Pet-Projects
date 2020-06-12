$(document).ready(function () {
  
    
    $('.search').click(function () { // відкриття корзини 
        $('.search__panel').toggleClass('open');
    });


    $(document).mouseup(function (e) { // событие клика по веб-документу
        var searchPanel = $(".menu .wrap"); // тут указываем клас элемента
        if (!searchPanel.is(e.target) && // если клик был не по нашему блоку
        searchPanel.has(e.target).length === 0) { // и не по  дочерним элементам menu
            $('.search__panel').removeClass('open');
        }
      }); // для того щоб  пошук  згортався при кліку в по іншому місці документу (кнопка тд....)
    

});