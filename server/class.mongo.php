<?php
	error_reporting(E_ALL);
	ini_set("display_errors","On");
	include("debug.php");
	require_once("config.php");
	require_once("modules/class.module.php");
	require_once("modules/class.listmodule.php");
	require_once("modules/class.itemmodule.php");
	include("util.php");
	include("core/class.mongodbconnection.php");
	include("core/class.jsonrequest.php");
	include("core/class.dispatcher.php");
	include("core/class.operations.php");

	$GLOBALS['connection'] = new MongoDBConnections();
	$GLOBALS["dispatcher"] = new Dispatcher();
	$GLOBALS["operations"] = new Operations();
	
	$json = readData();
	$request = new JSONRequest($json);

	try{
		$request->execute($json);
	} catch (Exception $e){
		echo "Exception throws";
	}
?>