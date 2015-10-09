window.onload = function () {
    var vLineSize = function () {
        if(document.getElementById("principal") !== null){
            console.log($('#principal').contents().height());
            $('.verticalLine').css("height", document.getElementById("principal").scrollHeight);
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