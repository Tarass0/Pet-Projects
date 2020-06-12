$(document).ready(function () {

   

    function sidebarOverlay(index, opacity) { //  затемнення фону при висуванні меню з категоріями товарів
        $('.overlay').css("z-index", index);
        $('.overlay').css("opacity", opacity);
    }

    $('.basket').click(function () { // відкриття корзини 
        if (!$('.basket__box').hasClass('open')) {
            $('.basket__box').addClass('open');
            //$('.basket__box').css("display", "block");
            //$('.basket__box').css("right", "0px");
            sidebarOverlay(1, 0.6);
        }
    });

    $('.basket__title svg').click(function () { // закриття корзини
        if ($('.basket__box').hasClass('open')) {
        $('.basket__box').removeClass('open');
        //$('.basket__box').css("right", "-999px");
        //$('.basket__box').css("display", "none");
        sidebarOverlay(-1,0);
        }
    }); 

    var arrPluss = $('.plus__one');
    var arrMinus = $('.minus__one');
    var arrGoodsnumber = $('.goods__number input');
    var arrPrice = $('.goods__price :nth-child(1)');
    var arrTotalPrice = $('.goods__total :nth-child(2)');

    function plusOneGoods(goodsNumber, goodsPrice, totalPrice) {
        var counter = $(goodsNumber).val(); //витягує значення кількості товару
        counter++; //збільшує кількість товару на один
        $(goodsNumber).val(counter);
        console.log(counter);
        var price = parseInt($(goodsPrice).text());
        var total = price * counter;
        console.log(total);
        totalPrice = $(totalPrice).text(total);
    }

    function minusOneGoods(goodsNumber, goodsPrice, totalPrice) {
        var counter = $(goodsNumber).val(); //витягує значення кількості товару
        if (counter > 1) {
            counter--; //збільшує кількість товару на один
            $(goodsNumber).val(counter);
            console.log(counter);
            var price = parseInt($(goodsPrice).text());
            var total = price * counter;
            console.log(total);
            totalPrice = $(totalPrice).text(total);
        }
    }

    function totalSumOrdering() {
        var arrTotalPrice = $('.goods__total :nth-child(2)');
        var sum = 0;
        $.each(arrTotalPrice, function (value) {
            // arrTotalPrice[value] will contain an HTML element, representing an 'item'.
            var itemValue = parseInt($(arrTotalPrice[value]).text());
            // if(!isNaN(itemValue)){
            //     sum += itemValue;
            // } else{
            //     sum += 0;
            // }
            sum += !isNaN(itemValue) ? itemValue : 0;
        });
        $('.total__sum :nth-child(2)').text(sum);
        console.log(sum );
    }

    function manualEntryQuantityGoods(goodsNumber,goodsPrice,totalPrice) {
        
        var counter = $(goodsNumber).val(); //витягує значення кількості товару
        if (counter < 1 ) { //перевірка на то щоб користувач не міг вписати кількість товару менше одного
            //якщо було введено менше одного то лічильнику присвоюється значення 1 (мінімальне допустиме значення)
            counter = 1;
            $(goodsNumber).val(1);
            var price = parseInt($(goodsPrice).text());
            var total = price * counter;
            console.log(total);
            totalPrice = $(totalPrice).text(total);
        } else{
            $(goodsNumber).val(counter);
            console.log(counter);
            var price = parseInt($(goodsPrice).text());
            var total = price * counter;
            console.log(total);
            totalPrice = $(totalPrice).text(total);
        }
    }

    totalSumOrdering();

    $.each(arrPluss, function (index, value) {
        var plus = arrPluss[index];
        var goodsNumber = arrGoodsnumber[index];
        var goodsPrice = arrPrice[index];
        var totalPrice = arrTotalPrice[index];
        $(plus).click(function () {
            //console.log("Cтруктура = " + this.parentElement.outerHTML);
            // console.log("Індекс нажатого плюса = " + index);
            if (plus.index == goodsNumber.index) {
                // console.log("Індекс співпали");
                plusOneGoods(goodsNumber, goodsPrice, totalPrice);
                totalSumOrdering();
            }
        });
    });

    $.each(arrMinus, function (index, value) {
        var minus = arrMinus[index];
        var goodsNumber = arrGoodsnumber[index];
        var goodsPrice = arrPrice[index];
        var totalPrice = arrTotalPrice[index];
        $(minus).click(function () {
            //console.log("Cтруктура = " + this.parentElement.outerHTML);
            //console.log("Індекс нажатого плюса = " + index);
            if (minus.index == goodsNumber.index) {
                minusOneGoods(goodsNumber, goodsPrice, totalPrice);
                totalSumOrdering();
            }
        });
    });

    $.each(arrGoodsnumber, function (index, value) {
        var goodsNumber = arrGoodsnumber[index];
        var goodsPrice = arrPrice[index];
        var totalPrice = arrTotalPrice[index];
        $(goodsNumber).on('input', function (e) {
            //console.log("Cтруктура = " + this.parentElement.outerHTML);
            //console.log("Індекс нажатого плюса = " + index);
            if (goodsNumber.index == totalPrice.index) {
                manualEntryQuantityGoods(goodsNumber,goodsPrice,totalPrice);
                totalSumOrdering();
            }
        });
    });
});
