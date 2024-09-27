<?php
$host = '127.0.0.1';
$dbname = 'bddtpfilm';
$username = 'root';
$password = '';

try {
    //    instance PDO pour la connexion
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);


    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    //    si y erreur de connexion
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
?>
