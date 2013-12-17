<div class="panel panel-info">
    <div class="panel-heading">
    <h3 class="panel-title">Hostname</h3>
    </div>
    <div class="panel-body"id="hostname">
		<span class="value"></span>
	</div>
</div>

<div class="panel panel-info">
    <div class="panel-heading">
    <h3 class="panel-title"><span class="glyphicon glyphicon-fire">&nbsp;</span>Command</h3>
    </div>
    <div class="panel-body" id="command">
		<span class="value">
			<a href="#" class="shutdown">Shutdown</a>
		</span>
	</div>
</div>

<div class="panel panel-info">
    <div class="panel-heading">
    <h3 class="panel-title">Uptime</h3>
    </div>
    <div class="panel-body"id="uptime">
		<span class="value"></span>
	</div>
</div>

<div class="panel panel-info">
    <div class="panel-heading">
    <h3 class="panel-title">Ram</h3>
    </div>
    <div class="panel-body"id="mem">
		<span class="value">
			<div class="progress">
				<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
			    	<span class="sr-only"></span>
			    </div>
			</div>
			<span class="subtitle">free: </span><span id="freemem"></span><br />
			<span class="subtitle">used: </span><span id="usedmem"></span><br />
			<span class="subtitle">total: </span><span id="totalmem"></span>
		</span>
	</div>
</div>

<div class="panel panel-info">
    <div class="panel-heading">
    <h3 class="panel-title"><span class="glyphicon glyphicon-hdd">&nbsp;</span>Storage</h3>
    </div>
    <div class="panel-body"id="storage">
		<span class="value"></span>
	</div>
</div>

<div class="panel panel-info">
    <div class="panel-heading">
    <h3 class="panel-title"><span class="glyphicon glyphicon-fire">&nbsp;</span>Temperature</h3>
    </div>
    <div class="panel-body"id="temp">
		<span class="value">
			<span class="subtitle">CPU:</span><br />
			<div class="progress">
				<div class="progress-bar progress-bar-success cpu-progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
			    </div>
			</div>
			<span class="cpu"></span>
		</span>
	</div>
</div>

<div class="panel panel-info">
    <div class="panel-heading">
    <h3 class="panel-title">CPU's</h3>
    </div>
    <div class="panel-body"id="cpus">
		<span class="value">
			<div id="cpus-detail">
			
			</div>
		</span>
	</div>
</div>

<div class="panel panel-info">
    <div class="panel-heading">
    <h3 class="panel-title">CPU load</h3>
    </div>
    <div class="panel-body"id="cpuLoad">
		<span class="value">
			<div id="cpus-detail">
			<span class="subtitle">1 min: </span><span class="min-1"></span><br />
			<span class="subtitle">5 min: </span><span class="min-5"></span><br />
			<span class="subtitle">15 min: </span><span class="min-15"></span><br />
			</div>
		</span>
	</div>
</div>

<!--
<div class="item hostname">
	<span class="title">Hostname</span>
	<p></p>
</div>
<div class="item sysInfo">
	<span class="title">System Info</span>
	<p></p>
</div>
<div class="item">
	<span class="title"></span>
	<p></p>
</div>
<div class="item uptime">
	<span class="title">Uptime</span>
	<p></p>
</div>
<div class="item totalmem">
	<span class="title">Memory</span>
	<div class="progress">
		<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
	    	<span class="sr-only">60% Complete</span>
	    </div>
	</div>
	<p>free:</p> <span class="free"></span>
	<p>used:</p> <span class="used"></span>
	<p>total:</p> <span class="total"></span>
</div>-->