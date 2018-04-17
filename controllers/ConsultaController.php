<?php

function __autoload($className)
{
    include_once("../models/$className.php");
}

$consultas = new Consulta("localhost", "root", "", "crud");

if (!isset($_POST['action'])) {
    print json_encode(0);
    return;
}

switch ($_POST['action']) {
    case 'get':
        print $consultas->get();
        break;

    case 'add':
        $consulta = new stdClass;
        $consulta = json_decode($_POST['consulta']);
        print $consultas->add($consulta);
        break;

    case 'delete':
        $consulta = new stdClass;
        $consulta = json_decode($_POST['consulta']);
        print $consultas->delete($consulta);
        break;

    case 'update':
        $consulta = new stdClass;
        $consulta = json_decode($_POST['consulta']);
        print $consultas->update($consulta);
        break;
    case 'filter':
        $consulta = new stdClass;
        $consulta = json_decode($_POST['consulta']);
        print $consultas->getFilter($consulta);
        break;
}

exit();