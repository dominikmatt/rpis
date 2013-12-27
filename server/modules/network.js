exports.page = function(clientData, os, exec, sys, fs, socket)
{
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
	
	//action
	network.getStaticData();
	network.getDynamicData();
	
	interval = setInterval(function () {
		network.getDynamicData();
	}, 1000);
}