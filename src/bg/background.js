var messageMinutePairs;
var alarms = [];
getAlarms();
checkAlarms();
var interval = setInterval(checkAlarms, 60000);

//Refresh alarms if needed
chrome.runtime.onMessage.addListener(
  function(message, sender) {
  	//make sure this mesage came from this extension to hamper tampering
  	if(message["message"] == "REFRESH_ALARMS" && sender["id"] == chrome.runtime.id){
  		getAlarms();
  	}
});


function getAlarms(){
    chrome.storage.local.get('alarms', function(items) {
        if (items) {
            alarms = items['alarms'];
        }
    });
}

function checkAlarms(){
	var currentMinute = new Date().getMinutes();
	alarms.forEach(function(element, index){
		element["minutes"].forEach(function(minute){
			if(minute == currentMinute)
			{
	    		var options = {
	            type: "basic",
	            title: "Actaviz",
	            message: element["message"],
	            iconUrl: '../../icons/icon48.png'
	        	};
	        	chrome.notifications.create(options);
			}
		});
	});
}