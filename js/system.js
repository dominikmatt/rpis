var system = {
		ws: null,
		init: function(ws) 
		{
			system.ws = ws;
			system.command();
		},
		
		command: function()
		{
			$('#command .shutdown').on('click', function() {
				var wsSend = '{"page": "system","do": "shutdown"}';
				system.ws.send(wsSend); 
				return false;
			});
		}
	}
