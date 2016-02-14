<?php
class Operations
{
    /**
     * @param $data
     */
    function Operations()
    {

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
}
?>