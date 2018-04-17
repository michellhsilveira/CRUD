<?php

class Medico
{

    private $dbh;

    public function __construct($host, $user, $pass, $db)
    {
        $this->dbh = new PDO("mysql:host=" . $host . ";dbname=" . $db, $user, $pass);
    }

    public function get()
    {
        $sth = $this->dbh->prepare("SELECT * FROM medico");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }

    public function add($medico)
    {
        $sth = $this->dbh->prepare("INSERT INTO medico(name, email) VALUES (?, ?)");
        $sth->execute(array($medico->name, $medico->email));
        return json_encode($this->dbh->lastInsertId());
    }

    public function delete($medico)
    {
        $sth = $this->dbh->prepare("DELETE FROM medico WHERE id=?");
        $sth->execute(array($medico->id));
        return json_encode(1);
    }

    public function update($medico)
    {
        $sth = $this->dbh->prepare("UPDATE medico SET " . $medico->field . "=? WHERE id=?");
        $sth->execute(array($medico->newvalue, $medico->id));
        return json_encode(1);
    }
}

?>