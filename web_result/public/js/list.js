// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
//import axios from './axios.js';
var temp;
var recordTime;
var index;

$(window).on("load resize ", function() {
    var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
    $('.tbl-header').css({'padding-right':scrollWidth});
  }).resize();


function chageGrade(){
    var langSelect = document.getElementById("id_grade");
    // select element에서 선택된 option의 value가 저장된다.
    var selectValue = langSelect.options[langSelect.selectedIndex].value;
    console.log(selectValue);
}


$(function() {
    var msgFromServer;
    $.get( "/searchdata", function( searchdata ) {
        msgFromServer = searchdata.text;
        //console.log(data[0]);

        $.each(searchdata, function(idx, row){
            recordTime = searchdata[idx].recordTime;
            temp = searchdata[idx].temp;
            index = searchdata[idx].id;
            console.log('id is ' + index + '     temp is : ' + temp);

            $.get( "/alldata", function( alldata ) {
                msgFromServer = alldata;
                $.each(alldata, function(idxx, row){
                    console.log(index);
                    if(alldata[idxx].id == index){  // searchData에서 꺼내온 값과 id가 일치하다면
                        console.log("!"+alldata[idxx].id);
                        $('#record > tbody:last').append('<tr><td>'+recordTime+'<td>'+alldata[idxx].grade+'</td>'+'<td>'+alldata[idxx].class+'</td>'+'<td>'+alldata[idxx].classNumber+'</td>'+'<td>'+alldata[idxx].name+'</td>'+'<td>'+temp+'</td></tr>');
                        return idxx;
                    }
                })
        
                //console.log(alldata[index]);
            });

        })
        // recordTime = data[0].recordTime;
        // temp = data[0].temp;
        // index = data[0].id;
        // console.log('id is ' + index + '     temp is : ' + temp);
        //$('#record > tbody:last').append('<tr><td>'+data[0].recordTime+'<td>'+data[0].recordCode+'</td>'+'<td>'+data[0].recordCode+'</td>'+'<td>'+data[0].recordCode+'</td>'+'<td>'+data[0].recordCode+'</td>'+'<td>'+data[0].temp+'</td></tr>');
    
        
    });

    
});

// $(function() {
//     var msgFromServer;
//     $.get( "/searchdata", function( searchdata ) {
//         msgFromServer = searchdata.text;
//         //console.log(data[0]);

//         $.each(searchdata, function(idx, row){
//             recordTime = searchdata[idx].recordTime;
//             temp = searchdata[idx].temp;
//             index = searchdata[idx].id;
//             console.log('id is ' + index + '     temp is : ' + temp);

//             $.get( "/alldata", function( alldata ) {
//                 msgFromServer = alldata;
//                 $.each(alldata, function(idxx, row){
//                     console.log(index);
//                     if(alldata[idxx].id == index){  // searchData에서 꺼내온 값과 id가 일치하다면
//                         console.log("!"+alldata[idxx].id);
//                         $('#record > tbody:last').append('<tr><td>'+recordTime+'<td>'+alldata[idxx].grade+'</td>'+'<td>'+alldata[idxx].class+'</td>'+'<td>'+alldata[idxx].classNumber+'</td>'+'<td>'+alldata[idxx].name+'</td>'+'<td>'+temp+'</td></tr>');
//                         return idxx;
//                     }
//                 })
        
//                 //console.log(alldata[index]);
//             });

//         })
//         // recordTime = data[0].recordTime;
//         // temp = data[0].temp;
//         // index = data[0].id;
//         // console.log('id is ' + index + '     temp is : ' + temp);
//         //$('#record > tbody:last').append('<tr><td>'+data[0].recordTime+'<td>'+data[0].recordCode+'</td>'+'<td>'+data[0].recordCode+'</td>'+'<td>'+data[0].recordCode+'</td>'+'<td>'+data[0].recordCode+'</td>'+'<td>'+data[0].temp+'</td></tr>');
    
        
//     });

    
// });

// function chageGrade(){
//     var langSelect = document.getElementById("id_grade");
//     // select element에서 선택된 option의 value가 저장된다.
//     var selectValue = langSelect.options[langSelect.selectedIndex].value;
//     console.log(selectValue);
// }


