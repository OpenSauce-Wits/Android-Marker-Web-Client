<?php

namespace androidMarker\Test;

use PHPUnit\DbUnit\TestCaseTrait;
use PHPUnit\Framework\TestCase;
use androidMarker\index;
class indexTest extends TestCase
{

    use TestCaseTrait;

    // Instantiate pdo once for test clean-up / fixture loda
    static private $pdo = null;

    // Instantiate once per test
    private $conn = null;

    public function setUp(): void
    {
        global $CFG;
        $this->dbhost = $CFG->dbhost;
        $this->dbuser = $CFG->dbuser;
        $this->dbpass = $CFG->dbpass;
        $this->dbname = $CFG->dbname;
        $this->tableName = "ams_emulators";
        $this->fixtures = __DIR__ . DIRECTORY_SEPARATOR . "fixtures" . DIRECTORY_SEPARATOR . "ams_emulators_fixture.xml";
        $this->expected = __DIR__ . DIRECTORY_SEPARATOR . "fixtures" . DIRECTORY_SEPARATOR . "ams_emulators_expected.xml";
        $this->databaseValue = array('id' => 3, 'emulator_id' => "ABCA4C15903451915", 'state' => 'device', 'in_use' => 'false');
        $this->encodedJSON = '[{"id":1,"emulator_id":"WCYC4C18809001072","state":"device","in_use":"false"},{"id":2,"emulator_id":"ZBYA4C14405981207","state":"device","in_use":"true"}]';
        $this->jsonName = "EmulatorTable.json";
    }


    final public function getConnection()
    {
        // TODO: Implement getConnection() method.
        if ($this->conn === null) {
            if (self::$pdo == null) {
                self::$pdo = new \PDO($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWD']);
            }
            $this->conn = $this->createDefaultDBConnection(self::$pdo, $GLOBALS['DB_DBNAME']);
        }
        return $this->conn;
    }

    protected function getDataSet()
    {
        // TODO: Implement getDataSet() method.
        return $this->createFlatXMLDataSet($this->fixtures);
    }

    public function testGetConnectMessage()
    {
        $index = new index($this->dbhost,$this->dbuser,$this->dbpass,$this->dbname);
        $this->assertEquals("Success",$index->getConnectionMessage());
        $this->assertEquals($this->jsonName,$index->getJSONName());

    }


    public function testSelectAllReturnsEncodedJSON(){
        $index = new index($this->dbhost,$this->dbuser,$this->dbpass,$this->dbname);
        $outputJSON = $index->generateEncodedJSON();
        $this->assertEquals($this->encodedJSON,$outputJSON);
    }
}