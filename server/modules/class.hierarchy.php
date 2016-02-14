<?php
class hierarchy extends ListModule
{
    /**
     * @param $data
     */
    function hierarchy($data)
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
                case "list":
                    $this->getData($action);
                break;
            }
        }
    }   

    /**
     * 
     */
    function getData($action)
    {
        $dbs = $GLOBALS['connection']->getDatabases();  
        foreach ($dbs['databases']  as $db) {
            $connection = $GLOBALS['connection']->getDatabase($db['name']);
            $dbNames = $connection->getCollectionNames();
            foreach ($dbNames as $collectionName) {
                $nodes[] = array(
                    'text' => $collectionName,
                    'iconCls'=> 'x-fa fa-table',
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
}
?>