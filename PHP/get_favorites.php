<?php
require_once 'bddConnection.php';

$query = $pdo->query('SELECT * FROM favorites');
$favorites = $query->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($favorites);
?>