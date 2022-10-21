
const utils = {
    edenAjax:function (endPoint, method, successCallback, errorCallback, requestBody) {
    utils.showLoadingBar();
    $.ajax(endPoint, {
            method: method,
            contentType: "application/json",
            crossDomain:false, // 이거 false가 default라고 되있는데, 안쓰면 ie에서 에러난다.
            success: successCallback,
            error: errorCallback,
            complete: function () {
                utils.hideLoadingBar();
            },
            data: JSON.stringify(requestBody)
        })
    },
    hideLoadingBar: function () {
        $('#mask, #loadingImg').hide();
        $('#mask, #loadingImg').remove();
    },
    showLoadingBar: function () {
        var maskHeight = $(document).height();
        var maskWidth = window.document.body.clientWidth;
        var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
        var loadingImg = '';
        loadingImg += "<div id='loadingImg' style='position:absolute; left:50%; top:40%; display:none; z-index:10000;'>";
        loadingImg += "    <img src='/assets/imgs/loading.gif'/>";
        loadingImg += "</div>";
        $('body').append(mask).append(loadingImg);
        $('#mask').css({
            'width': maskWidth
            , 'height': maskHeight
            , 'opacity': '0.3'
        });
        $('#mask').show();
        $('#loadingImg').show();
    },
    truncate: function(str, n){
        return (str.length > n) ? str.substr(0, n-1) + "&hellip;" : str;
    },
    getQueryStringObject: function () {
        var a = window.location.search.substr(1).split('&');
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    },
    navigate:function(path){
        location.href=path;
    }
}

$.fn.utils = utils