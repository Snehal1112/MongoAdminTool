<?php  
/**
 * undocumented class
 *
 * @package default
 * @author 
 **/
class JSONRequest
{
    /**
     * Constructor
     */
    function JSONRequest()
    {

    }

    function execute($json)
    {
        try{
            // decode JSON data
            $data = json_decode($json, true);

            // Check if the JSON is parsed correctly into an array
            $data = $data["zarafa"] ? $data["zarafa"] : false;
            // @TODO throw exception if zarafa tag is not present
            if(is_array($data)) {
                // iterate over all module names
                foreach($data as $moduleName => $moduleData) {
                    // each module can contain multiple requests using different module ids
dump($moduleName, '$moduleName');
                    dump($moduleData, '$moduleData');
                       $moduleObj = $GLOBALS["dispatcher"]->loadModule($moduleName, $moduleData);

                        // Check if the module is loaded
                        if (is_object($moduleObj)) {

                            // Execute the actions in the module
                            $moduleObj->execute();
                        }
                }
            }
        }catch (Exception $e){
            echo "asdasjdhajkshdkasd";
        }
    }
}

?>