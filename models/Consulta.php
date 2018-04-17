<?php

class Consulta
{

    private $dbh;

    public function __construct($host, $user, $pass, $db)
    {
        $this->dbh = new PDO("mysql:host=" . $host . ";dbname=" . $db, $user, $pass);
    }

    public function get()
    {
        $sth = $this->dbh->prepare("SELECT consulta.id, paciente.name AS paciente, medico.name AS medico, consulta.data_consulta FROM consulta INNER JOIN medico ON consulta.medico_id = medico.id INNER JOIN paciente ON consulta.paciente_id = paciente.id");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }

    public function getFilter($filter)
    {
        $sth = $this->dbh->prepare("SELECT consulta.id, paciente.name AS paciente, medico.name AS medico, consulta.data_consulta FROM consulta INNER JOIN medico ON consulta.medico_id = medico.id INNER JOIN paciente ON consulta.paciente_id = paciente.id WHERE consulta.data_consulta = '" . $filter->data_filtro . "'");
        $sth->execute();

        return json_encode($sth->fetchAll());
    }

    public function add($consulta)
    {
        $sth = $this->dbh->prepare("INSERT INTO consulta(medico_id, paciente_id, data_consulta) VALUES (?, ?, ?)");
        $sth->execute(array($consulta->medico_id, $consulta->paciente_id, $consulta->data_consulta));
        return json_encode($this->dbh->lastInsertId());
    }

    public function delete($consulta)
    {
        $sth = $this->dbh->prepare("DELETE FROM consulta WHERE id=?");
        $sth->execute(array($consulta->id));
        return json_encode(1);
    }

    public function update($consulta)
    {
        $sth = $this->dbh->prepare("UPDATE consulta SET " . $consulta->field . "=? WHERE id=?");
        $sth->execute(array($consulta->newvalue, $consulta->id));
        return json_encode(1);
    }
}

?>