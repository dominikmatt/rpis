<?php
namespace lib;

class core
{
	private static $instance = null;
	
	protected $curPage = 'home';

	public static function getInstance()
	{
		if(self::$instance == null) {
			self::$instance = new core();
		}
		
		return self::$instance;
	}
	
	protected function __construct()
	{
		if(isset($_GET['page'])) {
			$this->curPage = $_GET['page'];
		} else {
			$this->curPage = 'home';
		}
	}
	
	public function getPage()
	{
		return $this->curPage;
	}
}
?>