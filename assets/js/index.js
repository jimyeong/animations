$(document).ready(function(){
    app.init();
    
    
})
/* 
const variables = {
    host: ""
}; */

const targetID ="박광현"
const app = {
    init:function(){
        app.onClickSubmit();
        app.onFocusOut();
    },
    getUserName: function(){
        const username =  $('#username_ctrl').val();
        return username;
    },
    onFocusOut: function(){
        // 이렇게 하면 typing 될때마다, 변경을 탐지할 수 있다.
        $(document).on('input', function(){
            const button = $("#lucky_number-btn");
            const target = $('#username_ctrl');
            const value =  target.val();
            if(value===targetID){button.removeClass('dn')};
            if(value!==targetID){button.addClass('dn')};
        })
    },
    onClickSubmit: function(){
        // 행운번호 추첨 버튼
        $('#lucky_number-btn').on('click', function(e){
            e.stopPropagation();
            $.fn.utils.navigate("/fortune_number.html");
        });
        $('#send_user_data').on('click', function(e){
            e.stopPropagation();
            
            const username = app.getUserName(); // 데이터 가져오는 함수
            const endPoint = SERVER_HOST;
            const method = "POST";
            const requestBody = {username};
            location.href = `/processing.html?username=${username}`
            const successCallback = ()=>{
                // page전환
                
            }
            const errorCallback = ()=>{}
            // $.fn.utils.edenAjax(endPoint, method, successCallback, errorCallback, requestBody);
        });
    }
};
