<?php
	/**
	 * Module
	 * Superclass of every module. Many default functions are defined in this class.
	 */
	class Module
	{
		/**
		 * @var int unique id of the class.
		 */
		var $id;

		/**
		 * @var string entryid, which will be registered by the bus object.
		 */
		var $entryid;

		/**
		 * @var array list of all actions, which is received from the client.
		 */
		var $data;

		/**
		 * @var array list of the results, which is send to the client.
		 */
		var $responseData;

		/**
		 * @var array list of all the errors occurred.
		 */
		var $errors;

		/**
		 * @var State The state object which refers to the statefile
		 */
		var $sessionState;

		/**
		 * @var array data stored in session for this module
		 */
		var $sessionData;

		/**
		 * Constructor
		 * @param int $id unique id.
		 * @param array $data list of all actions.
		 */
		function Module($data)
		{
			$this->data = $data;
			$this->errors = array();
			$this->responseData = array();
			$this->sessionState = false;
			$this->sessionData = false;

			$this->createNotifiers();
		}

		/**
		 * Creates the notifiers for this module,
		 * and register them to the Bus.
		 */
		function createNotifiers()
		{
		}
    }
 ?>