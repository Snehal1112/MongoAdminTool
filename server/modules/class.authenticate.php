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

    /**
     * 
     */
    function recursive($key, $values)
    {
        foreach ($values as $k => $v) {
            if(is_array($v)){
                $n[] = $this->recursive($k,$v); 
            }else {
                $n[] = array(
                    'key' => $k,
                    'field' => $v,
                    'type' => gettype($v),
                    'leaf' => true
                );   
            }
        }

        $nodes = array(
            'key' => $key,
            'field' => "{ " . count($values) . " fields }",
            'type' => gettype($values)
        );

        if(isset($n))
        {
            $nodes['children'] = $n;
        }
        unset($n);
        return $nodes;
    }

    /**
     * 
     */
    function getListRecord($action)
    {
        $co = isset($action['collection']) ?  $action['collection'] : 'restaurants';
        $db = isset($action['database']) ?  $action['database'] : false;
        $data = array();
        $collection =  $GLOBALS['connection']->connStart($co,$db);
        $usersCursor = $collection->find()->limit(50);
        foreach ($usersCursor as $document) {
            dump($document, '$document');
            foreach ($document as $key => $value) {
                if(is_array($value)) {
                    $nodes[] = $this->recursive($key, $value);
                } else {

                    if(is_object($value)){
                        $value = $document['_id']->{'$id'};
                    }

                    $nodes[] = array(
                        'key' => $key,
                        'field' => $value,
                        'type' => gettype($value),
                        'leaf' => true
                    );
                }
            }
       
            $data[] = array(
                'key' => $document['_id']->{'$id'},
                'iconCls' => 'x-tree-icon x-fa fa-envelope',
                'field' => "{ " . count($document) . " fields }",
                'type' => gettype($document),
                'children' => $nodes
            );
            unset($nodes);
        }

        if (is_null($data)) {
            return;
        }
        $response = array('children' => $data);
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