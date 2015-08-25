<?php

/**
 * Created by PhpStorm.
 * User: snehal
 * Date: 8/14/2015
 * Time: 5:27 PM
 */
class Dispatcher
{
    public function Dispatcher()
    {

    }

    /**
     * Load a module with a specific name
     *
     * If required, loads the source for the module, then instantiates a module of that type
     * with the specified id and initial data. The $id and $data parameters are directly
     * forwarded to the module constructor.
     *
     * Source is loaded from server/modules/class.$modulename.php
     *
     * @param string $moduleName The name of the module which should be loaded (eg 'hierarchymodule')
     * @param integer $id Unique id number which represents this module
     * @param array $data Array of data which is received from the client
     * @return object Module object on success, false on failed
     */
    function loadModule($moduleName, $data)
    {
        $module = false;
        $path = BASE_PATH . 'modules/class.' . $moduleName . '.php';
        if (is_file($path) === true) {
            require_once($path);
            $module = new $moduleName($data);
        }
        return $module;
    }
}