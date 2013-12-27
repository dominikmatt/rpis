exports.page = function(clientData, os, exec, sys, fs, socket)
{
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
	
	
	//action
	system.getStaticData();
	system.getDynamicData();
	
	interval = setInterval(function () {
		system.getDynamicData();
	}, 1000);

};
