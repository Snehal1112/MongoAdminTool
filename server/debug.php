<?php
	function dump($variable, $title="", $backtrace=false, $resource=false) {
		$file = fopen("t.txt","a+");
		$date = strftime("%d-%b-%Y");
		$time = strftime("%H:%M:%S");
		if($resource) {
			fwrite($file, ("[" . $date . " " . $time . "] " . $title. " - " . var_export(get_resource_type($variable), true) . "\r\n"));
		} else {
			fwrite($file, ("[" . $date . " " . $time . "] " . $title. " - " . var_export($variable, true) . "\r\n"));
		}
	}

?>
