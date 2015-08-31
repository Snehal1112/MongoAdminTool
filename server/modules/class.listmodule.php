<?php
/**
 * ListModule
 * Superclass of every module, which retreives a MAPI message list. It
 * extends the Module class.
 */
class ListModule extends Module
{
    /**
     * @var array list of columns which are selected in the previous request.
     */
    var $properties;

    /**
     * @var array sort.
     */
    var $sort;

    /**
     * @var int startrow in the table.
     */
    var $start;

    /**
     * @var array contains (when needed) a restriction used when searching
     */
    var $searchRestriction;

    /**
     * @var bool contains check whether a search result is listed or just the contents of a normal folder
     */
    var $searchFolderList;

    /**
     * @var array stores search criteria of previous request
     */
    var $searchCriteriaCheck;

    /**
     * @var array stores entryids and last modification time of
     * messages that are already sent to the server
     */
    var $searchResults;

    /**
     * @var MAPIFolder resource of the freebusy folder which holds
     * information regarding delegation details, this variable will
     * only be populated when user is a delegate
     */
    var $localFreeBusyFolder;

    /**
     * @var BinString binary string of PR_MDB_PROVIDER property
     * of a store, this variable will only be populated when user is a delegate
     */
    var $storeProviderGuid;

    /**
     * Constructor
     * @param int $id unique id.
     * @param array $data list of all actions.
     */
    function ListModule($data, $events = false)
    {
        $this->start = 0;

        $this->sort = array();

        parent::Module($data);
    }

    /**
     * Executes all the actions in the $data variable.
     * @return boolean true on success of false on fialure.
     */
    function execute()
    {
        foreach ($this->data as $actionType => $action) {
            /*if (isset($actionType)) {
                try {
                    $store = $this->getActionStore($action);
                    $parententryid = $this->getActionParentEntryID($action);
                    $entryid = $this->getActionEntryID($action);

                    switch ($actionType) {
                        case "list":
                            $this->getDelegateFolderInfo($store);
                            $this->messageList($store, $entryid, $action, $actionType);
                            break;
                        default:
                            $this->handleUnknownActionType($actionType);
                    }
                } catch (MAPIException $e) {
                    $this->processException($e, $actionType, $store, $parententryid, $entryid, $action);
                } catch (SearchException $e) {
                    $this->processException($e, $actionType, $store, $parententryid, $entryid, $action);
                }
            }*/
        }
    }
}

?>