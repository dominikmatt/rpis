<?php
	error_reporting(E_ALL); 
	ini_set('display_errors', 1);  
	include('define.php');
	include('lib/autoload.php');
	$core = lib\core::getInstance();
	$navigator = new lib\navigator();
?>
 <!DOCTYPE html>
<html>
	<head>
		<title>Raspberry PI Systeminfo</title>
		<link rel="stylesheet" type="text/css" href="css/style.css" />
	</head>
	<body>
	
		<div class="wrap clearfix">
			<div class="left-area">
				<div class="pi-logo">
					<img src="img/pi_logo.png" alt="Raspberry Pi" />
				</div>
				<ul>
					<li <?php echo $navigator->isActive('home'); ?>><a href="?page=home"><span class="glyphicon glyphicon-home">&nbsp;</span>Home</a></li>
					<li <?php echo $navigator->isActive('system'); ?>><a href="?page=system"><span class="glyphicon glyphicon-book">&nbsp;</span>System</a></li>
					<li <?php echo $navigator->isActive('network'); ?>><a href="?page=network"><span class="glyphicon glyphicon-transfer">&nbsp;</span>Network</a></li>
					<li <?php echo $navigator->isActive('services'); ?>><a href="?page=services"><span class="glyphicon glyphicon-tasks">&nbsp;</span>Services</a></li>
					<li <?php echo $navigator->isActive('about'); ?>><a href="?page=about"><span class="glyphicon glyphicon-user">&nbsp;</span>About</a></li>
					<li <?php echo $navigator->isActive('lcd'); ?>><a href="?page=lcd"><span class="glyphicon glyphicon-user">&nbsp;</span>Display</a></li>
				</ul>
			</div>
			<div class="content <?php echo $core->getPage(); ?>">
				<?php include('pages/' . $core->getPage() . '.php'); ?>
			</div>
		</div>
	
	<script type="text/javascript">
			window.ip = '<?php echo $_SERVER['SERVER_ADDR']; ?>';
	</script>
	<script type="text/javascript" src="js/script.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			window.config = {
				page: "<?php echo $core->getPage(); ?>"
			}
			window.wsSend = '{"page": "<?php echo $core->getPage(); ?>"}';
		});
	</script>
	</body>
</html>
