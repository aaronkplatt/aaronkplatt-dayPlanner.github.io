//current day
$(`#currentDay`).text(moment().format('MMMM Do YYYY, h:mm a')); 

//timeblock (tb = timeblock)
var tb = $(`#timeblock-templete`).html();
var container = $(`#container`);
//Loop to create all of the time fr all of the timeBlocks
for (let index = 9; index <= 17; index++) {
    var hour = index;
    //sets the time to am or pm
    var amPM = "AM";
    //if pm
    if (hour > 11)
    {
        amPM = "PM"
    }
    //sets the time back to 1 so it doesn't stay on military time
    if (hour > 12)
    {
        hour = hour -12;
    }
    //sets the time for the time block
    //https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string
    var newTb = tb.split("-hour").join("-" + index);
    container.append(newTb);

    //setting the time to the time
    $(`#time-` + index).text(hour + ` ` + amPM);
    
    //Setting the current hour to military time
    var currentHour = moment().format('HH');
    
    //In these conditions you are identifying what the current time is and what has passed, current, and future.
    var event = $(`#event-` + index);
    if (currentHour == index){
        event.addClass("hourCurrent");//in css
    }
    else if (currentHour > index){
        event.addClass("hourPast");//in css
    }
    else if (currentHour < index){
        event.addClass("hourFuture");//in css
    }

    var saveButton = document.getElementById("saveBtn-" + index);
    
    //On click to save all the data.
    saveButton.addEventListener("click", function(event) {
        var hour = this.id.split("-")[1];
        var eventDetails = document.getElementById("userTextArea-" + hour).value;
        var savedContent = JSON.parse(window.localStorage.getItem("savedContent")) || [];
        var found = false;
        //Update the event if it already exists
        for (let i = 0; i < savedContent.length; i++) {
            if(savedContent[i].hourOfDay == hour) {
                savedContent[i].eventText = eventDetails;
                found = true;
            }
        }
        if(found == false) {
            //This is a new event that is getting pushed into local storage.
            var evt = {
                hourOfDay: hour,
                eventText: eventDetails
            };
            savedContent.push(evt);
        }
        window.localStorage.setItem("savedContent", JSON.stringify(savedContent));
    });
}
//function to place the data you have already saved.
function loadPageData() {
    var savedContent = JSON.parse(window.localStorage.getItem("savedContent")) || [];
    for (let i = 0; i < savedContent.length; i++) {
        const evt = savedContent[i];
        var hour = evt.hourOfDay;
        var eventText = evt.eventText;
        document.getElementById("userTextArea-" + hour).value = eventText;
    }
}
loadPageData();