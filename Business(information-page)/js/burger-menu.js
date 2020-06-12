$(document).ready(function () {
    $('#nav-icon').click(function () {
        $(this).toggleClass('open');
        //$('.header__nav').toggleClass('open');
        $('nav .navigation').slideToggle(500);
        if ($(this).hasClass('open')) {
            $('nav #nav-icon').css("margin-top", "3px");
        } else {
            $('nav #nav-icon').css("margin-top", "0px");
        }

    });

    $(window).resize(function () {
        if ($(window).width() > 500) {
            $('nav .navigation').removeAttr('style');
            $('#nav-icon').removeClass('open');
        }
    }); // resize

});