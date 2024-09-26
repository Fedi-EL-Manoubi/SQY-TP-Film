<?php
require_once 'db_connection.php';
// verification
if (isset($_POST['title'], $_POST['year'], $_POST['imdbID'])) {
    $title = $_POST['title'];
    $year = $_POST['year'];
    $imdbID = $_POST['imdbID'];

    // add les film
    $stmt = $pdo->prepare('INSERT INTO favorites (title, year, imdbID) VALUES (:title, :year, :imdbID)');
    $stmt->execute([
        ':title' => $title,
        ':year' => $year,
        ':imdbID' => $imdbID
    ]);

    echo 'Favori ajouté';
}
?>
