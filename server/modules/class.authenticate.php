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
                    $this->getListRecord($action);
                    break;
                case "treelist":
                    $this->getData($action);
                break;
            }
        }
    }

    function getListRecord($action)
    {
        $collection =  $GLOBALS['connection']->connStart('users');
        $query = array();
        $children = array();
        $usersCursor = $collection->find($query,array("_id" => false))->limit(2);
        $response['text'] = '.';
        foreach ($usersCursor as $document) {
            foreach ($document as $key => $value) {
                $data[] = array(
                    'key' => $key,
                    'field' => $value,
                    'type' => gettype($value),
                    'leaf' => true
                ); 
            }
            $children = array('key'=>'userss','children'=> $data);
        }
        
        //$response = array('children' => $data);
        $response = array('children' => $children);
        dump(json_encode($response), 'json_encode($response)');
        echo json_encode($response);
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

            if(isset($nodes) && !is_null($nodes)){
                $data[] = array(
                    'text' => $db['name'],
                    'iconCls'=> 'x-faaa fa-mongodb',
                    'children' => $nodes
                );
                unset($nodes);
            }
        }
        $response = array('children' => $data);
        echo json_encode($response); 
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