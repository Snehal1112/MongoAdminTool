<?php
	class documentitemmodule extends ItemModule
	{
		/**
		 * Constructor
		 * @param int $id unique id.
		 * @param array $data list of all actions.
		 */
		function documentitemmodule($data)
		{
			parent::ItemModule($data);
		}

		function remove($action) 
		{
			dump($action, '$action');
		}
	}
?>
