var m = require('mraa'); 
console.log('MRAA Version: ' + m.getVersion()); 
var prev;
var current;
prev =  myDigitalPin.read(); 

var myDigitalPin = new m.Gpio(6); 
myDigitalPin.dir(m.DIR_IN); 
myDigitalPin.mode(m.MODE_PULLUP); 

periodicActivity(); 

function periodicActivity() {
  var current =  myDigitalPin.read(); 
  console.log('Gpio is ' + current); 
  if(current==0&&prev==1){
	postToSlack();
  }	
  setTimeout(periodicActivity,1000); 
  prev = current;	
}

function postToSlack(){
	var exec = require('child_process').exec;
	exec('./slackpost.sh "Whooa! I\'ve got an emergency stop!"', function callback(error, stdout, stderr){
		console.log(error);
		console.log(stdout);
		console.log(stderr);
	});
}


