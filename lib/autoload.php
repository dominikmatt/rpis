<?php
namespace lib;

class autoloader
{
	public static function autoload($class)
	{
	
		$path = GLOBAL_ROOT_PATH . '/' . str_replace('\\', '/', $class) . '.php';
		
		if(file_exists($path)) {
			include_once( $path);
		} else {
			echo "error " . $class;
		}
	}
}

spl_autoload_register(array('lib\autoloader', 'autoload')); 

?>