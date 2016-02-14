<?php
class documentlistmodule extends ListModule
{
    /**
     * @param $data
     */
    function documentlistmodule($data)
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
            }
        }
    }

    /**
     * 
     */
    function getListRecord($action)
    {
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
                    $nodes[] = $GLOBALS["operations"]->recursive($key, $value, $document);
                } else {
                    $nodes[] = $GLOBALS["operations"]->createNode($key, $value, gettype($value), true);
                }
            }
       
            $keyField = $document['_id']->{'$id'};
            $valueField = "{ " . count($document) . " fields }";
            $typeField = gettype($document);
            $data[] = $GLOBALS["operations"]->createNode($keyField, $valueField, $typeField, false, $nodes); 
            unset($nodes);
        }

        if (is_null($data)) {
            return;
        }
        $response = array('total' => $totalCount, 'children' => $data);
        echo json_encode($response);
    }
}
?>