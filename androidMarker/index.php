<?php

namespace androidMarker;
include 'config.php';

include_once('DatabaseHelper.php');

class index
{
    private $database;
    private $mysqli;
    private $connectionMessage;
    private $table;
    private $jsonName;

    public function __construct($dbhost, $dbuser, $dbpass, $dbname)
    {
        $this->database = new DatabaseHelper($dbhost, $dbuser, $dbpass, $dbname);
        $this->mysqli = new \mysqli($dbhost, $dbuser, $dbpass, $dbname);
        $this->table = "ams_emulators";
        $this->jsonName = "EmulatorTable.json";
        $this->connectionMessage = $this->database->getConnectionMessage();
    }

    public function getConnectionMessage()
    {
        return $this->connectionMessage;
    }

    public function getJSONName()
    {
        return $this->jsonName;
    }

    public function generateEncodedJSON()
    {
        $statement = $this->mysqli->prepare("SELECT * FROM ams_emulators");
        $statement->execute();
        $result = $statement->get_result();
        $json_array = array();
        while ($r = $result->fetch_assoc()) {
            $json_array[] = $r;
        }
        return json_encode($json_array);
    }

    public function createJSONFile()
    {
        $fp = fopen($this->getJSONName(), 'w');
        fwrite($fp, $this->generateEncodedJSON());
        fclose($fp);
    }

}

global $CFG;
$index = new index($CFG->dbhost, $CFG->dbuser, $CFG->dbpass, $CFG->dbname);
if (!file_exists($index->getJSONName())) {
    $index->createJSONFile();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title> Android Marker Viewer</title>
</head>
<body onload = "window.open('../Assignment-Viewer.html','_self')"></body>
</html>
