var currentDayEl = $('#currentDay');
var saveBtnEl = $('.saveBtn');
var containerLgEl = $('.container-lg');                
var today = dayjs();

var hours = ['9', '10', '11', '12', '13', '14', '15', '16', '17']; 

//display the time in the format that it asked.
var date = today.format('dddd, MMMM-D, YYYY');
currentDayEl.text(date);

//keep current time 's hour
var thisHour = today.format('H');
var currentHourLastTime = thisHour;
var thisHourNum = parseInt(thisHour);

//if current time is in the work shift hour then just this timeblock should be red as present time
//all timeblocks before that should be gray as past time and all timeblocks after that should be green as future time 
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

//function to make the schedule in particular range gray as past time
function beforePresent(num) {
    var choose = containerLgEl.children().eq(num);
    console.log(choose);
    choose.addClass('past');
    choose.removeClass('future');
    choose.removeClass('present');
}

//function to make the schedule in particular range green as future time
function afterPresent(num) {
    var choose = containerLgEl.children().eq(num);
    console.log(choose);
    choose.removeClass('past');
    choose.addClass('future');
    choose.removeClass('present');
}

//function to check if the hour changed, reload the page to change the timeblocks color 
function refreshPageWhenHourChanged(){
    var currentDay = dayjs();
    var currentHour = currentDay.format('H');
 
    if (currentHour !== currentHourLastTime) {
     location.reload();
    }
    currentHourLastTime = currentHour;
}
 
//each second calls this function
setInterval(refreshPageWhenHourChanged,1000);

//function to retrieve userText from local storage 
function retrieveFromLocalStorage() {
    var savedUserText = JSON.parse(localStorage.getItem('userText'));

    if (!savedUserText) {
        return [];
    }
    return savedUserText;
}

//function to save to local storage
function saveToLocalStorage(userText) {
    localStorage.setItem('userText', JSON.stringify(userText));
}

//function to fill description with saved user input
function renderAfterLoad() {
    var savedUserTexts = retrieveFromLocalStorage();
  
    for (var i = 9; i <= 17; i++) {
      var timeIdEl = document.getElementById(`hour-${i}`);
      var textInput = timeIdEl.querySelector('.description');
      
      //Find the saved userText for the current timeblock(like hour-12)
      var savedText = savedUserTexts.find(function (event) {
        return event.time === `hour-${i}`;
      });

      // If a saved userText is found, set the input value to the saved userText text
      if (savedText) {
        textInput.value = savedText.text;
      }
    }
}

//event listener function when save button clicked
saveBtnEl.on('click',function() {
    var savedUserTexts = retrieveFromLocalStorage();
    console.log(savedUserTexts);
    var time = $(this).parent().attr("id");
    var text = $(this).siblings(".description").val().trim();
    
    //find the index of saved userText for the current timeblock
    var textIndex = savedUserTexts.findIndex(function (event) {
        return event.time === time;
    });
    
    //if there is a saved text, update the text
    if (textIndex !== -1) {
        savedUserTexts[textIndex].text = text;
      //if not, add a new to the array  
    } else {
        savedUserTexts.push({ time: time, text: text });
    }
    
    //update the local storage
    saveToLocalStorage(savedUserTexts);
});

function init() {
    renderAfterLoad();
}

//call init function when the DOM is ready
$(document).ready(init);





