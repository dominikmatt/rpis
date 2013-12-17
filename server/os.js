var os = require('os');
var exec = require('child_process').exec;

var Monitor = function() 
{
	this.hostname = os.hostname();
	this.sysInfo = 'on a ' + os.type() + ' ' + os.platform() + ' ' + os.arch() + ' System with ' + os.cpus().length + ' CPUs';
	this.totalmem = (os.totalmem() / 1048576) + '';
	this.uptime;
	this.freemem;
	this.load;
	this.ide;
}

Monitor.prototype.setIde = function()
{
	this.ide = os.cpus(); //exec('df-h');
}

Monitor.prototype.setUptime = function() 
{
	var seconds = os.uptime();
	var hours = Math.floor(seconds / 3600),
		minutes = Math.floor((seconds - hours * 3600) / 60);
		seconds = (seconds - hours * 3600 - minutes * 60);
	this.uptime = hours + ':' + minutes + ':' + seconds;
}	

Monitor.prototype.setFreemem = function()
{
	this.freemem = os.freemem() / 1048576;
}

Monitor.prototype.setLoad = function()
{
	this.load = this.formatNumber(os.loadavg()[0]);
}

Monitor.prototype.formatNumber = function(number)
{
	return Math.round(number * 100) / 100;
}

Monitor.prototype.clearScreen = function()
{
	for(var i=0; i<process.stdout.rows; i++) {
		console.log('\r\n');
	}
}

Monitor.prototype.update = function()
{
	this.setUptime();
	this.setFreemem();
	this.setLoad();
	this.setIde();
	return this;
}

Monitor.prototype.output = function()
{
	this.clearScreen();
	console.log(this.hostname);
	console.log(this.sysInfo);
	console.log('Uptime: ' + this.uptime);
	console.log( this.ide);
	var free = this.freemem;
	var total = this.totalmem;
	console.log('Freemem: ' + free + ' MB of ' + total + ' MB');
	console.log('Load: ' + this.load);
}

var sysMon = new Monitor();
setInterval(function()
{
	sysMon.update().output();
},100);
