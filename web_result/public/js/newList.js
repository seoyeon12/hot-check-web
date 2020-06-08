// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
//import axios from './axios.js';
var select_grade = 0, select_class = 0, select_time = 0;

var result_student = Create2DArray(200);

var allUser = Create2DArray(180); // 전교생을 담는 배열
var userCount = 0;  // 전교생을 담는 배열의 실제 데이터 갯수
var breakfastUser = Create2DArray(300);  // 아침 기록을 담는 배열
var lunchUser = Create2DArray(300);  // 점심 기록을 담는 배열
var dinnerUser = Create2DArray(300);  // 저녁 기록을 담는 배열
var houseinUser = Create2DArray(300);  // 입실 기록을 담는 배열
var houseoutUser = Create2DArray(300);  // 퇴실 기록을 담는 배열
var breakfastCount = 0, lunchCount = 0, dinnerCount = 0, houseinCount = 0, houseoutCount = 0;

$(window).on("load resize ", function () {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({ 'padding-right': scrollWidth });
}).resize();

function Create2DArray(rows) {
    var arr = [];
  
    for (var i=0;i<rows;i++) {
       arr[i] = [];
    }
  
    return arr;
  }



function changeTime(){  // 시간 selectBox를 선택할 경우 호출되는 이벤트 함수
    var timeSelect = document.getElementById("id_time");
    var gradeSelect = document.getElementById("id_grade");
    var classSelect = document.getElementById("id_class");
    select_grade = gradeSelect.options[gradeSelect.selectedIndex].value;
    select_class = classSelect.options[classSelect.selectedIndex].value;
    select_time = timeSelect.options[timeSelect.selectedIndex].value;  // select element에서 선택된 option의 value가 저장된다.
    console.log('select_time : ' + select_time + '/select_grade : ' + select_grade + '/select_class : ' + select_class);
    $('#record > tbody').empty();  // 표 모두 비우기

    if(select_time == 0){  // 시간을 선택하지 않았을 경우
        for(var i=0; i<breakfastCount; i++){
            if(select_grade == 0){  // 학년을 선택하지 않았을 경우 -> 예시 데이터(아침식사) 출력
                checkTemp_breakfast(i);
            }
        }
    }
    else if(select_time == 1){  // 아침식사일 경우
        for(var i=0; i<breakfastCount; i++){
            if(select_grade == 0){  // 학년을 선택하지 않았을 경우 -> 전체 출력
                checkTemp_breakfast(i);
            }
            else if(select_grade != 0){  // 학년을 선택했을 경우
                if(select_class == 0){  // 반을 선택하지 않았을 경우 -> 해당 학년 모두 출력
                    if(select_grade == breakfastUser[i][1]){
                        checkTemp_breakfast(i);
                    }
                }
                else if(select_class != 0){  // 반을 선택했을 경우 -> 해당 학년, 반 모두 출력
                    if(select_grade == breakfastUser[i][1] && select_class == breakfastUser[i][2]){
                        checkTemp_breakfast(i);
                    }
                }
            }
        }
    }
    else if(select_time == 2){  // 점심식사일 경우
        for(var i=0; i<lunchCount; i++){
            if(select_grade == 0)
                checkTemp_lunch(i);
            else if(select_grade != 0){  // 학년을 선택했을 경우
                if(select_class == 0){  // 반을 선택하지 않았을 경우 -> 해당 학년 모두 출력
                    if(select_grade == lunchUser[i][1])
                        checkTemp_lunch(i);
                }
                else if(select_class != 0){  // 반을 선택했을 경우 -> 해당 학년, 반 모두 출력
                    if(select_grade == lunchUser[i][1] && select_class == lunchUser[i][2])
                        checkTemp_lunch(i);
                }
            }
        }
    }
    else if(select_time == 3){  // 저녁식사일 경우
        for(var i=0; i<dinnerCount; i++){
            if(select_grade == 0){
                checkTemp_dinner(i);
            }
            else if(select_grade != 0){  // 학년을 선택했을 경우
                if(select_class == 0){  // 반을 선택하지 않았을 경우 -> 해당 학년 모두 출력
                    if(select_grade == dinnerUser[i][1])
                        checkTemp_dinner(i);
                }
                else if(select_class != 0){  // 반을 선택했을 경우 -> 해당 학년, 반 모두 출력
                    if(select_grade == dinnerUser[i][1] && select_class == dinnerUser[i][2])
                        checkTemp_dinner(i);
                }
            }
        }
    }
    else if(select_time == 4){  // 입실일 경우
        for(var i=0; i<houseinCount; i++){
            if(select_grade == 0){
                $('#record > tbody:last').append('<tr><td>' + houseinUser[i][0] + '<td>' + houseinUser[i][1] + '</td>' + '<td>' + houseinUser[i][2] + '</td>' + '<td>' + houseinUser[i][3] + '</td>' + '<td>' + houseinUser[i][4] + '</td>' + '<td>' + houseinUser[i][5] + '</td></tr>');
            }
            else if(select_grade != 0){  // 학년을 선택했을 경우
                if(select_class == 0){  // 반을 선택하지 않았을 경우 -> 해당 학년 모두 출력
                    if(select_grade == houseinUser[i][1])
                        $('#record > tbody:last').append('<tr><td>' + houseinUser[i][0] + '<td>' + houseinUser[i][1] + '</td>' + '<td>' + houseinUser[i][2] + '</td>' + '<td>' + houseinUser[i][3] + '</td>' + '<td>' + houseinUser[i][4] + '</td>' + '<td>' + houseinUser[i][5] + '</td></tr>');
                }
                else if(select_class != 0){  // 반을 선택했을 경우 -> 해당 학년, 반 모두 출력
                    if(select_grade == houseinUser[i][1] && select_class == houseinUser[i][2])
                        $('#record > tbody:last').append('<tr><td>' + houseinUser[i][0] + '<td>' + houseinUser[i][1] + '</td>' + '<td>' + houseinUser[i][2] + '</td>' + '<td>' + houseinUser[i][3] + '</td>' + '<td>' + houseinUser[i][4] + '</td>' + '<td>' + houseinUser[i][5] + '</td></tr>');
                }
            }
        }
    }
    else if(select_time == 5){  // 퇴실일 경우
        for(var i=0; i<houseoutCount; i++){
            if(select_grade == 0)
                checkTemp_houseout();
            else if(select_grade != 0){  // 학년을 선택했을 경우
                if(select_class == 0){  // 반을 선택하지 않았을 경우 -> 해당 학년 모두 출력
                    if(select_grade == houseoutUser[i][1])
                        checkTemp_houseout();
                }
                else if(select_class != 0){  // 반을 선택했을 경우 -> 해당 학년, 반 모두 출력
                    if(select_grade == houseoutUser[i][1] && select_class == houseoutUser[i][2])
                        checkTemp_houseout();
                }
            }
        }
    }
}


function checkTemp_lunch(i){
    if(parseFloat(lunchUser[i][5]) >= 37.5)
        $('#record > tbody:last').prepend('<tr style="background-color: #ff7563"><td>' + lunchUser[i][0] + '<td>' + lunchUser[i][1] + '</td>' + '<td>' + lunchUser[i][2] + '</td>' + '<td>' + lunchUser[i][3] + '</td>' + '<td>' + lunchUser[i][4] + '</td>' + '<td>' + lunchUser[i][5] + '</td></tr>');
    else
        $('#record > tbody:last').append('<tr><td>' + lunchUser[i][0] + '<td>' + lunchUser[i][1] + '</td>' + '<td>' + lunchUser[i][2] + '</td>' + '<td>' + lunchUser[i][3] + '</td>' + '<td>' + lunchUser[i][4] + '</td>' + '<td>' + lunchUser[i][5] + '</td></tr>');
}

function checkTemp_breakfast(i){
    if(parseFloat(breakfastUser[i][5]) >= 37.5)
        $('#record > tbody:last').prepend('<tr style="background-color: #ff7563"><td>' + breakfastUser[i][0] + '<td>' + breakfastUser[i][1] + '</td>' + '<td>' + breakfastUser[i][2] + '</td>' + '<td>' + breakfastUser[i][3] + '</td>' + '<td>' + breakfastUser[i][4] + '</td>' + '<td>' + breakfastUser[i][5] + '</td></tr>');
    else
        $('#record > tbody:last').append('<tr><td>' + breakfastUser[i][0] + '<td>' + breakfastUser[i][1] + '</td>' + '<td>' + breakfastUser[i][2] + '</td>' + '<td>' + breakfastUser[i][3] + '</td>' + '<td>' + breakfastUser[i][4] + '</td>' + '<td>' + breakfastUser[i][5] + '</td></tr>');
}

function checkTemp_dinner(i){
    if(parseFloat(dinnerUser[i][5]) >= 37.5)
        $('#record > tbody:last').prepend('<tr style="background-color: #ff7563"><td>' + dinnerUser[i][0] + '<td>' + dinnerUser[i][1] + '</td>' + '<td>' + dinnerUser[i][2] + '</td>' + '<td>' + dinnerUser[i][3] + '</td>' + '<td>' + dinnerUser[i][4] + '</td>' + '<td>' + dinnerUser[i][5] + '</td></tr>');
    else
        $('#record > tbody:last').append('<tr><td>' + dinnerUser[i][0] + '<td>' + dinnerUser[i][1] + '</td>' + '<td>' + dinnerUser[i][2] + '</td>' + '<td>' + dinnerUser[i][3] + '</td>' + '<td>' + dinnerUser[i][4] + '</td>' + '<td>' + dinnerUser[i][5] + '</td></tr>');
}

function checkTemp_housein(i){
    if(parseFloat(houseinUser[i][5]) >= 37.5)
        $('#record > tbody:last').prepend('<tr style="background-color: #ff7563"><td>' + houseinUser[i][0] + '<td>' + houseinUser[i][1] + '</td>' + '<td>' + houseinUser[i][2] + '</td>' + '<td>' + houseinUser[i][3] + '</td>' + '<td>' + houseinUser[i][4] + '</td>' + '<td>' + houseinUser[i][5] + '</td></tr>');
    else
        $('#record > tbody:last').append('<tr><td>' + houseinUser[i][0] + '<td>' + houseinUser[i][1] + '</td>' + '<td>' + houseinUser[i][2] + '</td>' + '<td>' + houseinUser[i][3] + '</td>' + '<td>' + houseinUser[i][4] + '</td>' + '<td>' + houseinUser[i][5] + '</td></tr>');
}

function checkTemp_houseout(i){
    if(parseFloat(houseoutUser[i][5]) >= 37.5)
        $('#record > tbody:last').prepend('<tr style="background-color: #ff7563"><td>' + houseoutUser[i][0] + '<td>' + houseoutUser[i][1] + '</td>' + '<td>' + houseoutUser[i][2] + '</td>' + '<td>' + houseoutUser[i][3] + '</td>' + '<td>' + houseoutUser[i][4] + '</td>' + '<td>' + houseoutUser[i][5] + '</td></tr>');
    else
        $('#record > tbody:last').append('<tr><td>' + houseoutUser[i][0] + '<td>' + houseoutUser[i][1] + '</td>' + '<td>' + houseoutUser[i][2] + '</td>' + '<td>' + houseoutUser[i][3] + '</td>' + '<td>' + houseoutUser[i][4] + '</td>' + '<td>' + houseoutUser[i][5] + '</td></tr>');
}

























$(function () {
    $.ajax({  // 전교생의 정보를 모두 받아온다
        type: "GET",
        url: '/userdata', 
        dataType: 'json', 
        async: true, 
        success: function (allrecord) {
            $.each(allrecord, function(alluser_index, row){
                allUser[alluser_index][0] = allrecord[alluser_index].grade;
                allUser[alluser_index][1] = allrecord[alluser_index].class;
                allUser[alluser_index][2] = allrecord[alluser_index].classNumber;
                allUser[alluser_index][3] = allrecord[alluser_index].name;
                allUser[alluser_index][4] = allrecord[alluser_index].id;
                userCount++;
            })
        }
    })

    $.ajax({
        type: "GET",
        url: '/dataBreakfast', 
        dataType: 'json', 
        async: true, 
        success: function (breakfast_record) {
            $.each(breakfast_record, function(breakfast_index, row){  // 아침식사 기록 배열을 돈다
                for(var i=0; i<userCount; i++){  // 전교생 배열을 돈다
                    if(breakfast_record[breakfast_index].id == allUser[i][4]){  // 아침식사 기록 n번째 학생의 아이디와 일치한 학생이 존재한다면 
                        breakfastUser[breakfast_index][0] = breakfast_record[breakfast_index].recordTime;  // 체온 측정한 날짜 저장
                        breakfastUser[breakfast_index][1] = allUser[i][0];  // 그 학생의 학년 저장
                        breakfastUser[breakfast_index][2] = allUser[i][1]  // 그 학생의 반 저장
                        breakfastUser[breakfast_index][3] = allUser[i][2];  // 그 학생의 번호 저장
                        breakfastUser[breakfast_index][4] = allUser[i][3]  // 그 학생의 이름 저장
                        breakfastUser[breakfast_index][5] = breakfast_record[breakfast_index].temp;  // 그 학생의 체온 저장
                        breakfastUser[breakfast_index][6] = breakfast_record[breakfast_index].recordCode;  // 체온 측정한 시간 코드 저장
                        breakfastCount++;
                    }
                }
            })
            
        }
    })

    $.ajax({
        type: "GET",
        url: '/dataLunch', 
        dataType: 'json', 
        async: true, 
        success: function (lunch_record) {
            $.each(lunch_record, function(lunch_index, row){  // 아침식사 기록 배열을 돈다
                for(var i=0; i<userCount; i++){  // 전교생 배열을 돈다
                    if(lunch_record[lunch_index].id == allUser[i][4]){  // 아침식사 기록 n번째 학생의 아이디와 일치한 학생이 존재한다면 
                        lunchUser[lunch_index][0] = lunch_record[lunch_index].recordTime;  // 체온 측정한 날짜 저장
                        lunchUser[lunch_index][1] = allUser[i][0];  // 그 학생의 학년 저장
                        lunchUser[lunch_index][2] = allUser[i][1]  // 그 학생의 반 저장
                        lunchUser[lunch_index][3] = allUser[i][2];  // 그 학생의 번호 저장
                        lunchUser[lunch_index][4] = allUser[i][3]  // 그 학생의 이름 저장
                        lunchUser[lunch_index][5] = lunch_record[lunch_index].temp;  // 그 학생의 체온 저장
                        lunchUser[lunch_index][6] = lunch_record[lunch_index].recordCode;  // 체온 측정한 시간 코드 저장
                        lunchCount++;
                    }
                }
            })
            
        }
    })


    $.ajax({
        type: "GET",
        url: '/dataDinner', 
        dataType: 'json', 
        async: true, 
        success: function (dinner_record) {
            $.each(dinner_record, function(dinner_index, row){  // 아침식사 기록 배열을 돈다
                for(var i=0; i<userCount; i++){  // 전교생 배열을 돈다
                    if(dinner_record[dinner_index].id == allUser[i][4]){  // 아침식사 기록 n번째 학생의 아이디와 일치한 학생이 존재한다면 
                        dinnerUser[dinner_index][0] = dinner_record[dinner_index].recordTime;  // 체온 측정한 날짜 저장
                        dinnerUser[dinner_index][1] = allUser[i][0];  // 그 학생의 학년 저장
                        dinnerUser[dinner_index][2] = allUser[i][1]  // 그 학생의 반 저장
                        dinnerUser[dinner_index][3] = allUser[i][2];  // 그 학생의 번호 저장
                        dinnerUser[dinner_index][4] = allUser[i][3]  // 그 학생의 이름 저장
                        dinnerUser[dinner_index][5] = dinner_record[dinner_index].temp;  // 그 학생의 체온 저장
                        dinnerUser[dinner_index][6] = dinner_record[dinner_index].recordCode;  // 체온 측정한 시간 코드 저장
                        dinnerCount++;
                    }
                }
            })
            
        }
    })

    $.ajax({
        type: "GET",
        url: '/dataHouseIn', 
        dataType: 'json', 
        async: true, 
        success: function (housein_record) {
            $.each(housein_record, function(housein_index, row){  // 아침식사 기록 배열을 돈다
                for(var i=0; i<userCount; i++){  // 전교생 배열을 돈다
                    if(housein_record[housein_index].id == allUser[i][4]){  // 아침식사 기록 n번째 학생의 아이디와 일치한 학생이 존재한다면 
                        houseinUser[housein_index][0] = housein_record[housein_index].recordTime;  // 체온 측정한 날짜 저장
                        houseinUser[housein_index][1] = allUser[i][0];  // 그 학생의 학년 저장
                        houseinUser[housein_index][2] = allUser[i][1]  // 그 학생의 반 저장
                        houseinUser[housein_index][3] = allUser[i][2];  // 그 학생의 번호 저장
                        houseinUser[housein_index][4] = allUser[i][3]  // 그 학생의 이름 저장
                        houseinUser[housein_index][5] = housein_record[housein_index].temp;  // 그 학생의 체온 저장
                        houseinUser[housein_index][6] = housein_record[housein_index].recordCode;  // 체온 측정한 시간 코드 저장
                        houseinCount++;
                    }
                }
            })
            
        }
    })

    $.ajax({
        type: "GET",
        url: '/dataHouseOut', 
        dataType: 'json', 
        async: true, 
        success: function (houseout_record) {
            $.each(houseout_record, function(houseout_index, row){  // 아침식사 기록 배열을 돈다
                for(var i=0; i<userCount; i++){  // 전교생 배열을 돈다
                    if(houseout_record[houseout_index].id == allUser[i][4]){  // 아침식사 기록 n번째 학생의 아이디와 일치한 학생이 존재한다면 
                        houseoutUser[houseout_index][0] = houseout_record[houseout_index].recordTime;  // 체온 측정한 날짜 저장
                        houseoutUser[houseout_index][1] = allUser[i][0];  // 그 학생의 학년 저장
                        houseoutUser[houseout_index][2] = allUser[i][1]  // 그 학생의 반 저장
                        houseoutUser[houseout_index][3] = allUser[i][2];  // 그 학생의 번호 저장
                        houseoutUser[houseout_index][4] = allUser[i][3]  // 그 학생의 이름 저장
                        houseoutUser[houseout_index][5] = houseout_record[houseout_index].temp;  // 그 학생의 체온 저장
                        houseoutUser[houseout_index][6] = houseout_record[houseout_index].recordCode;  // 체온 측정한 시간 코드 저장
                        houseoutCount++;
                    }
                }
                console.log(houseoutUser[houseout_index]);
            })
            
        }
    })
});
