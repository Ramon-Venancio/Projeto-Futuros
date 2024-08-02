<?php
    include 'config.php';

    $id = $_GET['id'];

    $sql = "DELETE FROM carros WHERE id=$id";


    if ($conn->query($sql) === TRUE) {
    
        header('Location: index.php');
        exit(); 
    } else {
        
        echo "Erro: " . $conn->error;
    }

    $conn->close();
?>
