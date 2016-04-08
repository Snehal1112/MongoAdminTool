<?php
	/**
	 * ItemModule
	 * Module which openes, creates, saves and deletes an item. It
	 * extends the Module class.
	 */
	class ItemModule extends Module
	{
		/**
		 * Constructor
		 * @param int $id unique id.
		 * @param array $data list of all actions.
		 */
		function ItemModule($data)
		{
			parent::Module($data);
		}

		/**
		 * Executes all the actions in the $data variable.
		 * @return boolean true on success of false on fialure.
		 */
		function execute()
		{
			foreach($this->data as $actionType => $action)
			{
				if(isset($actionType)) {
					try {
						switch($actionType)
						{
							case "destroy":
								$this->remove($action);
							break;
						}
					}catch(Exception $e) {
						dump('item module error', 'item module error');
					}
				}
			}
		}	
	}
?>
