<?php

	/**
	 * Utility functions
	 *
	 * @package core
	 */

	/**
	 * Function which reads the data stream. This data is send by the WebClient.
	 * @return string data
	 */
	function readData() {
		$data = "";
		$putData = fopen("php://input", "r");

		while($block = fread($putData, 1024))
		{
			$data .= $block;
		}

		fclose($putData);
		return $data;
	}
?>