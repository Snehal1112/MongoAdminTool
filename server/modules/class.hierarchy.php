<?php	
	error_reporting(E_ALL);
	ini_set("display_errors","On");
	require_once("../config.php");
	include("../core/class.mongodbconnection.php");
	$GLOBALS['connection'] = new MongoDBConnections();
	
	$collections = $GLOBALS['connection']->getDatabase()->getCollectionNames();
	$mongo = new MongoClient();
$dbs = $GLOBALS['connection']->conn->listDBs();
	foreach ($dbs['databases']  as $db) {
    	echo $db['name'];
	}

	foreach ($collections as $collectionName) {
    	$nodes[] = array(
                    'text' => $collectionName,
                    'iconCls'=> 'x-fa fa-database',
                    );
	}
	$response = array('children' => $nodes);
	//echo json_encode($response); 
?>