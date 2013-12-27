exports.page = function(clientData, os, exec, sys, fs, socket)
{
	var interval = setInterval(function() {
			var send = {};
			exec('/usr/sbin/service --status-all', 
			  function (error, stdout, stderr) {
			  	send = {
				  	type: 		 'dynamicData',
				  	services: stdout
				 };
				 socket.send(JSON.stringify(send, null, 4));
				 
			    if (error !== null) {
			      console.log('exec error: ' + error);
			    }
			});
	}, 10000);
};
