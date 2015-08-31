<?php
	class MongoDBConnections {
		var $conn;

		/**
		 * Constructor
		 */
		function MongoDBConnections()
		{
			$this->conn = new MongoClient(SERVER);
		}

		/**
		 * 
		 */
		public function getDatabase($dataBase = "party_board")
		{
			return $this->conn->$dataBase;
		}

		/**
		 * 
		 */
		public function getCollection($collection, $dataBase)
		{
			$dataBase = $this->getDatabase();
			return $dataBase->$collection;
		}

		/**
		 * 
		 */
		public function connClose()
		{
			$this->conn->close();
		}

		/**
		 * @param bool|false $collection
		 */
		public function connStart($collection = false, $dataBase = false)
		{
			if($collection !== false){
				return $this->getCollection($collection, $dataBase);
			} else {
				$this->connClose();
			}
		}
	}
?>
