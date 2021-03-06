<?php
	class MongoDBConnections {
		var $conn;

		/**
		 * Constructor
		 */
		function MongoDBConnections()
		{
			$this->conn = new MongoClient("mongodb://localhost:27017");
		}

		/**
		 * 
		 */
		public function getDatabase($dataBase = DATABASE_NAME)
		{
			return $this->conn->$dataBase;
		}

		/**
		 * 
		 */
		public function getCollection($collection, $dataBase)
		{
			$dataBase = $this->getDatabase($dataBase);
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

		/**
		 * 
		 */
		public function getDatabases()
		{
			return $this->conn->listDBs();
		}
	}
?>
