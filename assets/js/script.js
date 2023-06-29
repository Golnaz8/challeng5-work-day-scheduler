// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
});
  
  
var currentDayEl = $('#currentDay');
var saveBtnEl = $('.saveBtn');
var descriptionEl = $('.description');
var containerLgEl = $('.container-lg');  
var textEl = $('#text');                 
var today = dayjs();


var hours = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17']; 



var date = today.format('dddd, MMMM-D, YYYY');
currentDayEl.text(date);
var thisHour = today.format('H');
var currentHourLastTime = thisHour;
var thisHourNum = parseInt(thisHour);

if (thisHourNum>6 && thisHourNum<18) {
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

}else if(thisHourNum<7) {
    for (var i=0; i<11; i++) {
        afterPresent(i);
    }
}else if(thisHourNum>17) {
    for (var i=0; i<11; i++) {
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

function saveToLocalStorage() {
    localStorage.setItem('userText', JSON.stringify('userText'));
}

saveBtnEl.on('click',function() {
    var time = $(this).parent().attr("id");
    var text = $(this).siblings(".description").val().trim();
    console.log(time);
    console.log(text);
});


