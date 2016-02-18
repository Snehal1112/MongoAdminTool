<?php
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

	ob_start();
	setlocale(LC_CTYPE, "en_US.UTF-8");

	header("Content-Type: application/json; charset=utf-8");
	header("Expires: ".gmdate( "D, d M Y H:i:s")."GMT");
	header("Last-Modified: ".gmdate( "D, d M Y H:i:s")."GMT");
	header("Cache-Control: no-cache, must-revalidate");
	header("Pragma: no-cache");

	$GLOBALS['connection'] = new MongoDBConnections();
	$GLOBALS["dispatcher"] = new Dispatcher();
	$GLOBALS["operations"] = new Operations();

	$json = readData();
	$request = new JSONRequest($json);

	try{
		$request->execute($json);
	} catch (Exception $e){
		dump("Exception throws");
	}

	$GLOBALS['connection']->connClose();

?>