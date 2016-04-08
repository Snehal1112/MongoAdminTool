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
			dump('$data', '$data');
			parent::ItemModule($data);
		}

		function execute()
		{
			foreach($this->data as $actionType => $action)
			{
				dump($this->data, '$this->data');
				if(isset($actionType)) {
					try {
						switch($actionType)
						{
							case "destroy":
								dump('data', 'data');
							break;
						}
					}catch(Exception $e) {
						dump('item module error')
					}
				}
			}
		}
	}
?>
