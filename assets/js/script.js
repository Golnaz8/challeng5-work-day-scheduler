var currentDayEl = $('#currentDay');
var saveBtnEl = $('.saveBtn');
var containerLgEl = $('.container-lg');                
var today = dayjs();

var hours = ['9', '10', '11', '12', '13', '14', '15', '16', '17']; 

var date = today.format('dddd, MMMM-D, YYYY');
currentDayEl.text(date);
var thisHour = today.format('H');
var currentHourLastTime = thisHour;
var thisHourNum = parseInt(thisHour);

if (thisHourNum>8 && thisHourNum<18) {
    console.log(`true`);
    var index = hours.indexOf(thisHour);
    console.log(index);
    var choose = containerLgEl.children().eq(`${index}`);
    console.log(choose);
    choose.removeClass('past');
    choose.removeClass('future');
    choose.addClass('present');
    for (var i=0; i<index; i++) {
        beforePresent(i);
    }
    for (var i=index+1; i<11; i++) {
        afterPresent(i);
    }

}else if(thisHourNum<9) {
    for (var i=0; i<9; i++) {
        afterPresent(i);
    }
}else if(thisHourNum>17) {
    for (var i=0; i<9; i++) {
        beforePresent(i);
    }
}
    
function beforePresent(num) {
    var choose = containerLgEl.children().eq(num);
    console.log(choose);
    choose.addClass('past');
    choose.removeClass('future');
    choose.removeClass('present');
}

function afterPresent(num) {
    var choose = containerLgEl.children().eq(num);
    console.log(choose);
    choose.removeClass('past');
    choose.addClass('future');
    choose.removeClass('present');
}

function refreshPageWhenHourChanged(){
    var currentDay = dayjs();
    var currentHour = currentDay.format('H');
 
    if (currentHour !== currentHourLastTime) {
     location.reload();
    }
    currentHourLastTime = currentHour;
}
 
setInterval(refreshPageWhenHourChanged,1000);

function retrieveFromLocalStorage() {
    var savedUserText = JSON.parse(localStorage.getItem('userText'));

    if (!savedUserText) {
        return [];
    }
    return savedUserText;
}

function saveToLocalStorage(userText) {
    localStorage.setItem('userText', JSON.stringify(userText));
}

function renderAfterLoad() {
    var savedUserTexts = retrieveFromLocalStorage();
  
    for (var i = 9; i <= 17; i++) {
      var timeIdEl = document.getElementById(`hour-${i}`);
      var textInput = timeIdEl.querySelector('.description');
      
      var savedText = savedUserTexts.find(function (event) {
        return event.time === `hour-${i}`;
      });
      if (savedText) {
        textInput.value = savedText.text;
      }
    }
}

saveBtnEl.on('click',function() {
    var savedUserTexts = retrieveFromLocalStorage();
    console.log(savedUserTexts);
    var time = $(this).parent().attr("id");
    var text = $(this).siblings(".description").val().trim();
    
    var textIndex = savedUserTexts.findIndex(function (event) {
        return event.time === time;
    });
  
    if (textIndex !== -1) {
        savedUserTexts[textIndex].text = text;
    } else {
        savedUserTexts.push({ time: time, text: text });
    }
  
    saveToLocalStorage(savedUserTexts);
});

function init() {
    renderAfterLoad();
}

$(document).ready(init);





