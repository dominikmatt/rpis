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
		
		if(clientData['page'] == 'system') {
			system.getStaticData();
			system.getDynamicData();
			interval = setInterval(function () {
				system.getDynamicData();
			}, 1000);
		} else if(clientData['page'] == 'network') {
			network.getStaticData();
			network.getDynamicData();
			interval = setInterval(function () {
				network.getDynamicData();
			}, 1000);
			
		/* services module */
		} else if(clientData['page'] == 'services') {

			var interval = setInterval(function() {
					exec('/usr/sbin/service --status-all', 
					  function (error, stdout, stderr) {
					  	var send = {
						  	type: 		 'dynamicData',
						  	services: stdout
						 };
						 socket.send(JSON.stringify(send, null, 4));
						 
					    if (error !== null) {
					      console.log('exec error: ' + error);
					    }
					});
			}, 10000);
			
			//socket.send(JSON.stringify(send, null, 4));
			
		/* the lcd module */
		} else if(clientData['page'] == 'lcd') {
			
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
		}
	}
    });		
    
    socket.on('close', function() {
    	clearInterval(interval);
		console.log('DISCONNECTED');
	});
	
	
	
	/*
	* SYSTEM
	*----------------------------------------------------------*/
	
	var system = {
		getStaticData: function ()
	    {
	    	var send = {
	    		type: 		 'staticData',
	    		hostname: 	 os.hostname(),
	    		sysInfo: 	 'on a ' + os.type() + ' ' + os.platform() + ' ' + os.arch() + ' System with ' + os.cpus().length + ' CPUs',
	    		totalmem:	 (os.totalmem() / 1048576) + '',
	    	}
		    
		    socket.send(JSON.stringify(send, null, 4));
	    },
	    
	    getDynamicData: function ()
	    {
		    // /usr/sbin/service --status-all
			var send = {
	    		type: 		 'dynamicData',
	    		uptime: null,
	    		uptimeType: 'text',
	    		freemem: null,
	    		freememType: 'progress',
	    		cpu: os.cpus(),
	    		cpuLoad: os.loadavg(),
	    		cpuTemp: null,
	    		getCpuTemp: function()
	    		{
		    		var temperature = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
					temperature = ((temperature/1000).toPrecision(3));
					send.cpuTemp = temperature;
	    		},
	    		createFreemem: function()
	    		{
		    		send.freemem = os.freemem() / 1048576;
	    		},
	    		
	    		createUptime: function() 
	    		{
		    		var seconds = os.uptime();
					var hours = Math.floor(seconds / 3600),
						minutes = Math.floor((seconds - hours * 3600) / 60);
						seconds = (seconds - hours * 3600 - minutes * 60);
					send.uptime = hours + ':' + minutes + ':' + seconds;
	    		}
	    	}
	    	
	    	send.createUptime();
	    	send.createFreemem();
	    	send.getCpuTemp();
		    socket.send(JSON.stringify(send, null, 4));
	    }
	    
	};
	
	
	/*
	* NETWORK
	*----------------------------------------------------------*/
	
	var network = {
		getStaticData: function ()
	    {
	    	var send = {
	    		type: 		 'staticData',
	    		localIPInfo: localIPInfo
	    	}
		    
		    socket.send(JSON.stringify(send, null, 4));
	    },
	    
	    getDynamicData: function ()
	    {
		    
			var send = {
	    		type: 		 'dynamicData',
	    	}
	    	
		    socket.send(JSON.stringify(send, null, 4));
	    }
	    
	};
	
	
	
    
});