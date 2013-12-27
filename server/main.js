var conn = require('ws').Server;
var os = require('os');
var exec = require('child_process').exec;
var sys   = require('sys');
var fs = require('fs');


/* get the network data */
var networkInterfaces = os.networkInterfaces();

var addrInfo, ifaceDetails, _len;
var localIPInfo = {};
for (var ifaceName in networkInterfaces) {
    ifaceDetails = networkInterfaces[ifaceName];
    //Iterate over all interface details
    for (var _i = 0, _len = ifaceDetails.length; _i < _len; _i++) {
        addrInfo = ifaceDetails[_i];
        if (addrInfo.family === 'IPv4') {
            //Extract the IPv4 address
            if(!localIPInfo[ifaceName]) {
                localIPInfo[ifaceName] = {};
            }
            localIPInfo[ifaceName].IPv4 = addrInfo.address;
        } else if (addrInfo.family === 'IPv6') {
            //Extract the IPv6 address
            if (!localIPInfo[ifaceName]) {
                localIPInfo[ifaceName] = {};
            }
            localIPInfo[ifaceName].IPv6 = addrInfo.address;
        }
    }
}

/* init the ws server */

var config = {
	'socket' : new conn({host: localIPInfo['eth0']['IPv4'],port: 8080}),
}


/**
* init the user
*/
config.socket.on('connection', function(socket) {
	console.log('NEW CONNECTING');
	var interval;
	
	/**
	* register user
	*/
	socket.on('message', function(msg) 
    {
		var clientData = JSON.parse(msg);
		
		// check the page the client ist currently
		if(typeof clientData != 'undefined') {
			
			//load page module
			var page = require('./modules/' + clientData['page']).page(clientData, os, exec, sys, fs, socket);
		
			if(clientData['do'] == 'shutdown') {
				console.log('shutdown');
				var child = exec('sudo shutdown -h now', 
				  function (error, stdout, stderr) {
				    sys.print('stdout: ' + stdout);
				    sys.print('stderr: ' + stderr);
				    if (error !== null) {
				      console.log('exec error: ' + error);
				    }
				});
			}
		}

    });		
    
    socket.on('close', function() {
    	clearInterval(interval);
		console.log('DISCONNECTED');
	});
});