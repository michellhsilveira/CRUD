<?php

function __autoload($className)
{
    include_once("../models/$className.php");
}

$medicos = new Medico("localhost", "root", "", "crud");

if (!isset($_POST['action'])) {
    print json_encode(0);
    return;
}

switch ($_POST['action']) {
    case 'get':
        print $medicos->get();
        break;

    case 'add':
        $user = new stdClass;
        $user = json_decode($_POST['medico']);
        print $medicos->add($user);
        break;

    case 'delete':
        $user = new stdClass;
        $user = json_decode($_POST['medico']);
        print $medicos->delete($user);
        break;

    case 'update':
        $user = new stdClass;
        $user = json_decode($_POST['medico']);
        print $medicos->update($user);
        break;
}

exit();