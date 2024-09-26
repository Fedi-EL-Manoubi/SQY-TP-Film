    <?php
    // bdd connexion
    $servername = "127.0.0.1:3306";
    $username = "root";
    $password = "";
    $dbname = "bddtpfilm";

    try {
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connecté";
    } catch(PDOException $e) {
        echo "Erreur de connexion : " . $e->getMessage();
    }
    ?>