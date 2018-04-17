<?php

function __autoload($className)
{
    include_once("../models/$className.php");
}

$pacientes = new Paciente("localhost", "root", "", "crud");

if (!isset($_POST['action'])) {
    print json_encode(0);
    return;
}

switch ($_POST['action']) {
    case 'get':
        print $pacientes->get();
        break;

    case 'add':
        $user = new stdClass;
        $user = json_decode($_POST['paciente']);
        print $pacientes->add($user);
        break;

    case 'delete':
        $user = new stdClass;
        $user = json_decode($_POST['paciente']);
        print $pacientes->delete($user);
        break;

    case 'update':
        $user = new stdClass;
        $user = json_decode($_POST['paciente']);
        print $pacientes->update($user);
        break;
}

exit();