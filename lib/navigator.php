<?php
namespace lib;

class navigator
{
	public function isActive($page) 
	{
		$core = core::getInstance();
		
		if($page == $core->getPage()) {
			return 'class="active"';
		}
	}
}
?>