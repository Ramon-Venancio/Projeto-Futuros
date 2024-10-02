<?php
    include 'config.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Prepara e executa a inserção do usuário (sem criptografia)
        $stmt = $conn->prepare("INSERT INTO usuarios (username, password) VALUES (?, ?)");
        $stmt->bind_param('ss', $username, $password);

        if ($stmt->execute()) {
            echo "<script>
                    alert('Cadastrado com Sucesso');
                    window.location.href = 'login.php';
                </script>";
        } else {
            echo "<script>alert('Erro ao cadastrar. Por favor, tente novamente.');</script>";
        }

        $stmt->close();
    }

    $conn->close();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Usuário - Sistema de Checklist Veicular</title>
    <link rel="stylesheet" href="loginstyles.css">
</head>
<body>
    <main>
        <header>
            <img src="logo.png" alt="Logo da Empresa" style="width: 100px; height: auto;"> <!-- Substitua por sua logo -->
            <h1>Sistema de Checklist Veicular</h1>
        </header>
        <h2>Cadastro de Usuário</h2>
        <form method="POST" action="cadastro_usuario.php">
            <label for="username">Usuário:</label>
            <input type="text" id="username" name="username" required>
            
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
            
            <button type="submit">Cadastrar</button>
        </form>
    </main>
    <footer>
        <p>&copy; 2024 Sistema de Checklist Veicular. Todos os direitos reservados.</p>
    </footer>
</body>
</html>
