<?php

class Paciente
{

    private $dbh;

    public function __construct($host, $user, $pass, $db)
    {
        $this->dbh = new PDO("mysql:host=" . $host . ";dbname=" . $db, $user, $pass);
    }

    public function get()
    {
        $sth = $this->dbh->prepare("SELECT * FROM paciente");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }

    public function add($paciente)
    {
        $sth = $this->dbh->prepare("INSERT INTO paciente(name, email) VALUES (?, ?)");
        $sth->execute(array($paciente->name, $paciente->email));
        return json_encode($this->dbh->lastInsertId());
    }

    public function delete($paciente)
    {
        $sth = $this->dbh->prepare("DELETE FROM paciente WHERE id=?");
        $sth->execute(array($paciente->id));
        return json_encode(1);
    }

    public function update($paciente)
    {
        $sth = $this->dbh->prepare("UPDATE paciente SET " . $paciente->field . "=? WHERE id=?");
        $sth->execute(array($paciente->newvalue, $paciente->id));
        return json_encode(1);
    }
}

?>