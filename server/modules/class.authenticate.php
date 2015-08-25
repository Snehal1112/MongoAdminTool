<?php
class authenticate extends ListModule
{
    /**
     * @param $data
     */
    function authenticate($data)
    {
        parent::ListModule($data);

        $this->start = 0;
    }

    /**
     *
     */
    function execute()
    {
        foreach($this->data as $actionType => $action)
        {
            switch($actionType){
                case "check":
                    $this->userAuthentication($action["userid"], $action["password"], $action["access"]);
                break;
                case "list":
                    $this->getData($action);
                break;
            }
        }
    }

    function getData($action)
    {
        $dbs = $GLOBALS['connection']->conn->listDBs();  
        
        foreach ($dbs['databases']  as $db) {
            $connection = $GLOBALS['connection']->getDatabase($db['name']);
            $dbNames = $connection->getCollectionNames();
            foreach ($dbNames as $collectionName) {
                $nodes[] = array(
                    'text' => $collectionName,
                    'iconCls'=> 'x-fa fa-database',
                    'leaf' => true
                );
            }

            $data['children'][] = array(
                'text' => $db['name'],
                'iconCls'=> 'x-faaa fa-mongodb',
                'children' => $nodes
            );
            unset($nodes);
        }        
        
        $response = array('children' => $data);
        echo json_encode($data); 
    }

    /**
     * @param $userId
     * @param $pass
     * @param $access
     */
    function userAuthentication($userId, $pass, $access)
    {
        $loggedIn = false;
        $collection =  $GLOBALS['connection']->connStart('users');
        $password = $collection->findOne(array("first_name" => $userId), array("password"));
        $GLOBALS['connection']->connClose();
        if(!is_null($password) && $password['password'] === $pass){
            $loggedIn = true;
        }
        $response = array('success' => $loggedIn);
        echo json_encode($response);
    }
}
?>