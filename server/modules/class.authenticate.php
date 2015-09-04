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

    function createNode($key, $value, $type, $leaf = false, $children = array())
    {
        $node = array(
            'key' => $key,
            'field' => $value,
            'type' => gettype($value)
        );

        if($leaf) {
            $node['leaf'] = $leaf;
        } 

        if(isset($children) && !empty($children)) {
            $node['children'] = $children;
        }

        return $node;
    }   

    /**
     * 
     */
    function recursive($key, $values, $document)
    {
        foreach ($values as $k => $v) {

            if(is_array($v)){
                $n[] = $this->recursive($k,$v, $document); 
            }else if(is_object($v)){
                if (get_class($v) == 'MongoDate') {
                    $n[] = $this->recursive($k,$v, $document); 
                } else if(get_class($v) == 'MongoId') {
                    $value = $document['_id']->{'$id'};
                    $n[] = $this->createNode($key, $value, gettype($value), true);
                }
            }else {
                $n[] = $this->createNode($k, $v, gettype($v), true);
            }
        }

        $nodes = $this->createNode($key,  "{ " . count($values) . " fields }", gettype($values));

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
        dump($action, '$action');
        $co = isset($action['collection']) ?  $action['collection'] : 'restaurants';
        $db = isset($action['database']) ?  $action['database'] : false;
        $limit = isset($action['list']) ?  $action['list'] : 25;
        $start = isset($action['start']) ? $action['start'] : 0;
        $data = array();
        $collection =  $GLOBALS['connection']->connStart($co,$db);
        $usersCursor = $collection->find()->limit($limit)->skip($start);;
        $totalCount = $collection->count();
        foreach ($usersCursor as $document) {
            foreach ($document as $key => $value) {
                if(is_array($value) || is_object($value)) {
                    $nodes[] = $this->recursive($key, $value, $document);
                } else {
                    $nodes[] = $this->createNode($key, $value, gettype($value), true);
                }
            }
       
            $keyField = $document['_id']->{'$id'};
            $valueField = "{ " . count($document) . " fields }";
            $typeField = gettype($document);
            $data[] = $this->createNode($keyField, $valueField, $typeField, false, $nodes); 
            unset($nodes);
        }

        if (is_null($data)) {
            return;
        }
        $response = array('total' => $totalCount, 'children' => $data);
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
                    'iconCls'=> 'x-fa fa-gear',/*fa-database */
                    'leaf' => true
                );
            }

            if(isset($nodes) && !is_null($nodes)){
                $data[] = array(
                    'text' => $db['name'],
                    'iconCls'=> 'x-fa fa-database',
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