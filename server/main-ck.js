var conn=require("ws").Server,os=require("os"),exec=require("child_process").exec,networkInterfaces=os.networkInterfaces();for(var ifaceName in networkInterfaces){ifaceDetails=networkInterfaces[ifaceName];for(var _i=0,_len=ifaceDetails.length;_i<_len;_i++){addrInfo=ifaceDetails[_i];if(addrInfo.family==="IPv4"){localIPInfo[ifaceName]||(localIPInfo[ifaceName]={});localIPInfo[ifaceName].IPv4=addrInfo.address}else if(addrInfo.family==="IPv6"){localIPInfo[ifaceName]||(localIPInfo[ifaceName]={});localIPInfo[ifaceName].IPv6=addrInfo.address}}}console.log(localIPInfo);var config={socket:new conn({host:"192.168.1.3",port:8080})};config.socket.on("connection",function(e){function n(){var t={type:"staticData",hostname:os.hostname(),sysInfo:"on a "+os.type()+" "+os.platform()+" "+os.arch()+" System with "+os.cpus().length+" CPUs",totalmem:os.totalmem()/1048576+""};e.send(JSON.stringify(t,null,4))}console.log("NEW CONNECTING");e.on("message",function(e){console.log("from client: "+e)});e.on("close",function(){clearInterval(t);console.log("DISCONNECTED")});var t=setInterval(function(){var t={type:"dynamicData",uptime:null,uptimeType:"text",freemem:null,freememType:"progress",cpu:os.cpus(),createFreemem:function(){t.freemem=os.freemem()/1048576},createUptime:function(){var e=os.uptime(),n=Math.floor(e/3600),r=Math.floor((e-n*3600)/60);e=e-n*3600-r*60;t.uptime=n+":"+r+":"+e}};t.createUptime();t.createFreemem();e.send(JSON.stringify(t,null,4))},1e3);n()});