<?php
include('bdd_Connection.php');

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    //  supprimer le favori
    $query = $pdo->prepare("DELETE FROM favoris WHERE id = :id");
    $query->bindParam(':id', $id);
    $query->execute();

    // Redirection suppr
    header('Location: ../favorites.php');
    exit();
}
?>
