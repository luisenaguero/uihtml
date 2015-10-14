window.onload = function () {
    var vLineSize = function () {
        var allDiv = $('#principal').find($('div').filter(function() { return $(this).css("display") == "none" }));
        var sum = 0;
        allDiv.each(function(i){
            //console.log(sum);
            $('#principal').find(allDiv[i]).css("display", "block");
            sum += $('#principal').find(allDiv[i]).css('height');
            $('#principal').find(allDiv[i]).css("display", "none");
        });
        if(document.getElementById("principal") !== null){
//            console.log($('.hidden').height());
            $('.verticalLine').css("height", (document.getElementById("principal").scrollHeight*0.99)-sum);
        }
    };
    vLineSize();
    $(document).bind("DOMSubtreeModified", function () {
        vLineSize();
    });
    $(window).resize(function () {
        vLineSize();
    });
};