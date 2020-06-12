$(document).ready(function () {
    "use strict";
 
    $('.slide__price').slider({
        max:1000,
        min:0,
        range:true,
        values:[100,900],
        slide:function(event,ui){
            $('input[name="minPrice"]').val(ui.values[0]);
            $('input[name="maxPrice"]').val(ui.values[1]);
        }
    });
    $('input[name="minPrice"]').val(
    $('.slide__price').slider('values', 0) );
    $('input[name="maxPrice"]').val(
    $('.slide__price').slider('values', 1) );

 });