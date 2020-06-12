$(document).ready(function () {

    function changePhoneIcon(displayIconComputer, displayIconMobile) { //  виїзджаючий ціновий фільтер фільтер
        $('#icon__computer').css("display", displayIconComputer);
        $('#icon__mobile').css("display", displayIconMobile);
    }

    function checkWidth() {
        if (window.matchMedia('(max-width: 1024px)').matches) {
            changePhoneIcon("none", "block");
        } else {
            changePhoneIcon("block", "none");
        }
    }


    var resizeTimer;
    //події на завантаження та ресайз сторінки
    $(window).bind("load resize", function () {
        clearTimeout(resizeTimer);
        // перевірка чи  ресайз зупинився щоб не викликати функцію кожну секунду при зменшенні екрану
        resizeTimer = setTimeout(function () {
            checkWidth();
        }, 250);
    });

});