var alarms = [];
var numberOfRows = 0;

function addRow(element) {
	var row;
	numberOfRows++;
	if(element)
	{
		message = element['message'];
		minutes = element['minutes'];
		row = '<div class="alarmRow">'+numberOfRows+': Message: <input type="text" name="message" value="'+element['message']+'"" />Minutes: <input type="text" name="minutes" value='+element['minutes']+' /></div>';
	}
	else
	{
		row = '<div class="alarmRow">'+numberOfRows+': Message: <input type="text" name="message" />Minutes: <input type="text" name="minutes" /></div>';
	}	
	$('#addRowButton').before(row);
}

function saveOptions(){
	var alarmsToSave = [];
	var temp	= $('.alarmRow');
	$('.alarmRow').each(function(index, element){
		var message = $(element).find('[name="message"]').val();
		var minutes = $(element).find('[name="minutes"]').val();
		if(message && minutes)
		{
			minutes.replace(/[,0-9]/, "");
			minutes = minutes.split(",");
			alarmsToSave.push({message:message, minutes:minutes})
		}
	});
	chrome.storage.local.set({'alarms': alarmsToSave});
	//alarms have been changed. send message that will be recieved by background.js
	chrome.runtime.sendMessage({message: "REFRESH_ALARMS"});

}


$(document).ready ( function(){
	chrome.storage.local.get('alarms', function(items){
		if(items){
			alarms = items['alarms'];
			alarms.forEach(function(element){
				addRow(element);
			});
		}
	});

	document.getElementById("addRowButton").addEventListener("click", function(){addRow()});//anonynmous function so click event isn't passed to addrow
	document.getElementById("saveButton").addEventListener("click", saveOptions);
	document.getElementById("clearButton").addEventListener("click", function(){chrome.storage.local.clear()});
	addRow();
});