function extround(zahl,n_stelle) {
	zahl = (Math.round(zahl * n_stelle) / n_stelle);
   	return zahl;
}


	var ws = new WebSocket('ws://' + window.ip + ':8080/', ['soap', 'xmpp']); 
	var staticData = null;
	
	/* check connection */
	ws.onopen = function() {
		console.log('new connection');
		ws.send(window.wsSend);
		
		
		switch(window.config.page) {
				case 'lcd':
					lcd.init(ws);
					break;
				case 'system':
					system.init(ws);
					break;
			}
		
	};
	
	ws.onclose = function() {
		console.log('connection closed');
	}

	ws.onmessage = function(msg) {
		var data = msg.data;
		data = JSON.parse(data);
		
		//static data
		if(data.type == 'staticData') {
			
			staticData = data;
			
			for(key in data) {
				if(key == 'type') {
				
				} else if(key == 'totalmem') {
					$('#' + key + ' .progress-bar').attr('aria-valuemax', data[key]);
					$('#' + key + ' .sr-only').html(data[key]);
				} else if(key == 'localIPInfo') {
					console.log(data[key]);
					$('#ip-adresses').html(TemplateEngine(ipAddressTemplate, {
					    ipAddresses: data[key]
					}));
				} else {
					$('#' + key + ' .value').html(data[key]);
				}
			}
		}
		
		//dynamicData
		if(data.type == 'dynamicData') {

			for(key in data) {
				if(key == 'type') {
				
				} else if(key == 'cpu') {
					$('#cpus-detail').html(TemplateEngine(cpusTemplate, {
					    cpus: data[key]
					}));
				} else {
					if(data[key + 'Type'] == 'text') {
						$('#' + key + ' .value').html(data[key]);	
					} else if(key == 'freemem') {
						var percent = Math.floor((data[key]/staticData['totalmem'])*100);
						$('#mem .progress-bar').css('width', percent + '%');
						$('#freemem').html(Math.floor(data[key]) + 'MB');
						$('#totalmem').html(Math.floor(staticData['totalmem']) + 'MB');
						$('#usedmem').html(Math.floor(staticData['totalmem']-data[key]) + 'MB');
						
						$('#mem .progress-bar').css('width', percent + '%').html(Math.floor(percent) + '%');
						$('#mem .progress-bar').removeClass('progress-bar-success');
						$('#mem .progress-bar').removeClass('progress-bar-warning');
						$('#mem .progress-bar').removeClass('progress-bar-danger');
						
						if(percent >= 80 && percent < 95) {
							$('#mem .progress-bar').addClass('progress-bar-warning');
						} else if(percent >= 95) {
							$('#mem .progress-bar').addClass('progress-bar-danger');
						} else {
							$('#mem .progress-bar').addClass('progress-bar-success');
						}
						
					} else if(key == 'cpuLoad') {
						$('#cpuLoad .min-1').html(extround(data[key][0],100));
						$('#cpuLoad .min-5').html(extround(data[key][1],100));
						$('#cpuLoad .min-15').html(extround(data[key][2],100));
					} else if(key == 'cpuTemp') {
						$('#temp .cpu').html(data[key] + '&ordm;C');
						var percent = (100/85)*data[key];
						$('#temp .cpu-progress-bar').css('width', percent + '%').html(Math.floor(percent) + '%');
						
						$('#temp .cpu-progress-bar').removeClass('progress-bar-success');
						$('#temp .cpu-progress-bar').removeClass('progress-bar-warning');
						$('#temp .cpu-progress-bar').removeClass('progress-bar-danger');
						
						if(percent >= 60 && percent < 80) {
							$('#temp .cpu-progress-bar').addClass('progress-bar-warning');
						} else if(percent >= 80) {
							$('#temp .cpu-progress-bar').addClass('progress-bar-danger');
						} else {
							$('#temp .cpu-progress-bar').addClass('progress-bar-success');
						}
					} else if(key == 'services') {
						var output = '';
						service = data[key].split(' [ ');
						var s = [];
						for(index in service) {
							if(index > 0) {
								s[index] = service[index].split(' ] ');
								
								output = output + '<div class="wrap">';
								if(s[index][0] == '+') {
									output = output + '<span class="label label-success">running</span>';
								} else if(s[index][0] == '-') {
									output = output + '<span class="label label-danger">stopped</span>';
								}
								output = output + '<span class="name">' + s[index][1] + '</span>';
								output = output + '</div>';
							}
						}

						$('#services .value').html(output);
					}
				}
			}
		}
	}
	




