<?php	
	error_reporting(E_ALL);
	ini_set("display_errors","On");
	require_once("../config.php");
	include("../debug.php");
	include("../core/class.mongodbconnection.php");
	
	
	try {
	$GLOBALS['connection'] = new MongoDBConnections();
	$query = array();
	$collection =  $GLOBALS['connection']->connStart('users');
	$usersCursor = $collection->find($query,array("_id" => false))->limit(1);
	}catch (MongoCursorException $e) {
	    echo "error message: ".$e->getMessage()."\n";
	    echo "error code: ".$e->getCode()."\n";
	}

	foreach ($usersCursor as $document) {
		foreach ($document as $key => $value) {
			$data[] = array(
				'key' => $key,
				'field' => $value,
				'type' => gettype($value),
				'leaf' => true
			); 
		}
		$response['childern']['key'] = 'first ID';
		$response['childern']['fields'] = is_object($document) ? "Object" : "Array" +"{"+ count($document) +1 +"}";
		$response['childern']['childern'] = $data;
	}
		$fields = array('key', 'field', 'type');
		

		foreach ($fields as $field) {
			if($field == 'key') {
				$colModel['xtype'] = 'treecolumn';
			} /*else {
				$colModel['header'] = $field;
			}*/
			$colModel['dataIndex'] = $field;
            $colModel['text'] = $field;
            $t[] = $colModel;
		}
		dump($t, '$t');
	    $response['success'] = true;
        $response['metaData']['root'] = 'children';
        $response['metaData']['fields'] = $fields;
        $response['metaData']['colModel'] = $t;
	dump(json_encode($response), '$data');
?>