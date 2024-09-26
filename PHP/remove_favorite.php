<?php
global $pdo;
require_once 'db_connection';


if(isset($_POST[id])){
    $id = $_POST['id'];


    $stmt = $pdo->prepare('DELETE FROM favorites WHERE id = :id');
    $stmt->execute(['id' => $id]);


    echo 'Fav Supp !';
}

?>