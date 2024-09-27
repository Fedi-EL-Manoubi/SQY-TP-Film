<?php
session_start();
require_once 'bdd_Connection.php';

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    $query = $pdo->prepare('SELECT * FROM favorites WHERE user_id = :user_id');
    $query->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $query->execute();

    $favorites = $query->fetchAll(PDO::FETCH_ASSOC);

    // Retourner les favoris en format JSON
    echo json_encode($favorites);
} else {

    echo json_encode(['error' => 'Vous devez être connecté pour voir vos favoris.']);
}
?>
