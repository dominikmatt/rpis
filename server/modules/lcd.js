exports.page = function(clientData, os, exec, sys, fs, socket)
{
	//action
	if(clientData['do'] == 'changeColor') {
		var child = exec('sudo python python/lcd.py -c ' + clientData['color'], 
		  function (error, stdout, stderr) {
		    sys.print('stdout: ' + stdout);
		    sys.print('stderr: ' + stderr);
		    if (error !== null) {
		      console.log('exec error: ' + error);
		    }
		});
	} else if(clientData['do'] == 'displayOff') {
		var child = exec('sudo python python/lcd.py -o', 
		  function (error, stdout, stderr) {
		    sys.print('stdout: ' + stdout);
		    sys.print('stderr: ' + stderr);
		    if (error !== null) {
		      console.log('exec error: ' + error);
		    }
		});
	} else if(clientData['do'] == 'message') {
		var child = exec('sudo python python/lcd.py -s ' + clientData['text'], 
		  function (error, stdout, stderr) {
		    sys.print('stdout: ' + stdout);
		    sys.print('stderr: ' + stderr);
		    if (error !== null) {
		      console.log('exec error: ' + error);
		    }
		});
	}
};