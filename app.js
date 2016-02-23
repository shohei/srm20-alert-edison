var m = require('/usr/lib/node_modules/mraa'); 
var exec = require('child_process').exec;
console.log('MRAA Version: ' + m.getVersion()); 
var prev;
var current;

configPullmode();

var myDigitalPin = new m.Gpio(6); 
myDigitalPin.dir(m.DIR_IN); 

prev =  myDigitalPin.read(); 
periodicActivity(); 

function periodicActivity() {
  var current =  myDigitalPin.read(); 
  console.log('Gpio is ' + current); 
  if(current==1&&prev==0){
	postToSlack();
  }	
  setTimeout(periodicActivity,1000); 
  prev = current;	
}

function postToSlack(){
	console.log('posting to slack');	
	exec('/home/root/srm20/slackpost.sh "Ooops! I\'ve got an emergency stop!"', function callback(error, stdout, stderr){
		console.log(error);
		console.log(stdout);
		console.log(stderr);
	});
}

function configPullmode(){
	console.log('configure pulldown');	
        exec('/home/root/srm20/configuration.sh', function callback(error, stdout, stderr){
                console.log(error);
                console.log(stdout);
                console.log(stderr);
        });
}
