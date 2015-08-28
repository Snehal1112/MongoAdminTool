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
        dump($action, '$action');
        $collection =  $GLOBALS['connection']->connStart('restaurants');
        $query = array();
        $fields = array();
        $colModel = array();
        $enablRowExpander = false;
        $usersCursor = $collection->find($query,array("_id" => false))->limit($action['limit']);
        foreach ($usersCursor as $document) {
            $data[] = $document;
            foreach ($document as $key => $value) {
                if(array_search($key, $fields) === false){
                    array_push($fields,$key);
                }
            }
        }
        foreach ($fields as $key => $value) {
            $colModel['dataIndex'] = $value;
            $colModel['header'] = $value;
            if(!is_array($data[0][$value])){
                $colModel['editor'] = array('xtype' => 'textfield');
            } else if($value === 'address') {
                dump($value, '$value');
                $colModel['editor'] = array('xtype' => 'combobox',
                    'store' =>  array('Shade','Shade')/*array('s', 'b','c')*//*$data[0][$value]['coord']*/,
                    'autoSelect'=> true,
                    'typeAhead'=> true,
                    'triggerAction'=> 'all',
                 );
            } 
             $t[] = $colModel;
        }
        dump($enablRowExpander, '$enablRowExpander');
        $response = array('children' => $data);
        $response['success'] = true;
        $response['metaData']['root'] = 'children';
        $response['metaData']['rowexpander'] = $enablRowExpander;
        $response['metaData']['fields'] = $fields;
        $response['metaData']['clientIdProperty'] = 'clientId';
        $response['metaData']['colModel'] = $t;

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