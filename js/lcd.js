var lcd = {
		ws: null,
		init: function(ws) 
		{
			lcd.ws = ws;
			lcd.changeColor();
		},
		
		changeColor: function()
		{
			$('#color .color-name').on('change', function() {
				var color = $(this).val();
				var wsSend = '{"page": "lcd","color": "' + color + '","do": "changeColor"}';
				lcd.ws.send(wsSend); 
			});
			
			$('#color .display-off').on('click', function() {
				console.log('ok');
				var wsSend = '{"page": "lcd","do": "displayOff"}';
				lcd.ws.send(wsSend); 
				return false;
			});
			console.log('ok');
			$('#message .text').on('keyup', function() {
				var wsSend = '{"page": "lcd","do": "message","text": "' + $(this).val() + '"}';
				lcd.ws.send(wsSend); 
			});
		}
	}