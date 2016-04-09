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
			$result = false;
			$collectionName = $action['collection'];
			$dataBaseName = $action['database'];
			if(isset($collectionName) && isset($dataBaseName)) {
				$collection =  $GLOBALS['connection']->connStart($collectionName,$dataBaseName);

				foreach ($action['items'] as $value) {
					try {
					    $collection->remove( array( '_id' => new MongoID($value['key'])));
					    $result = true;
					} catch(MongoCursorException $e) {
					    $result =  $e->getMessage();
					}
				}
			}
			$response = array('success' => $result);
        	echo json_encode($response);
		}
	}
?>
