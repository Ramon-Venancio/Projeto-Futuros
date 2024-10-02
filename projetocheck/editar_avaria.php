<?php
    include 'config.php';
    session_start();

    if (!isset($_SESSION['username'])) {
        header('Location: login.php');
        exit();
    }

    // Função para atualizar uma avaria no banco de dados
    function atualizarAvaria($id, $placa, $localizacao, $descricao, $imagem) {
        global $conn;
        
        $stmt = $conn->prepare("UPDATE avarias SET placa = ?, localizacao = ?, descricao = ?, imagem = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $placa, $localizacao, $descricao, $imagem, $id);
        $stmt->execute();
        $stmt->close();
    }

    // Obtém o ID da avaria a ser editada
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $placa = $_POST['placa'];
            $localizacao = $_POST['localizacao'];
            $descricao = $_POST['avarias'];
            $imagem = $_POST['imagem_atual'];

            // Verifica se um novo arquivo foi enviado
            if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
                $imagem = 'uploads/' . basename($_FILES['imagem']['name']);
                move_uploaded_file($_FILES['imagem']['tmp_name'], $imagem);
            }

            atualizarAvaria($id, $placa, $localizacao, $descricao, $imagem);

            header('Location: lista_avarias.php');
            exit();
        }

        // Obtém a avaria atual do banco de dados
        $stmt = $conn->prepare("SELECT * FROM avarias WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $avaria = $result->fetch_assoc();
        $stmt->close();
    } else {
        header('Location: lista_avarias.php');
        exit();
    }
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Avaria</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <img src="logo.png" alt="Logo da Empresa">
        <h1>Sistema de Checklist Veicular</h1>
    </header>
    <nav>
        <ul>
            <a href="index.php">Home</a>
            <a href="add_car.php">Cadastro de Veículos</a>
            <a href="checklist.php">Checklist</a>
            <a href="lista_checklist.php">Ver Checklists</a>
            <a href="avarias.php">Cadastro de Avarias</a>
            <a href="lista_avarias.php">Lista de Avarias</a>
            <a href="pesquisa.php">Pesquisa</a>
            <a href="logout.php">Sair</a>
        </ul>
    </nav>
    <main>
        <h2>Editar Avaria</h2>
        <form action="" method="POST" enctype="multipart/form-data">
            <label for="placa">Placa:</label>
            <input type="text" name="placa" id="placa" value="<?php echo htmlspecialchars($avaria['placa']); ?>" required>
            
            <label for="localizacao">Localização:</label>
            <input type="text" name="localizacao" id="localizacao" value="<?php echo htmlspecialchars($avaria['localizacao']); ?>" required>
            
            <label for="avarias">Descrição:</label>
            <textarea name="avarias" id="avarias" required><?php echo htmlspecialchars($avaria['descricao']); ?></textarea>
            
            <label for="imagem">Imagem:</label>
            <input type="file" name="imagem" id="imagem">
            <?php if (!empty($avaria['imagem'])): ?>
                <p>Imagem atual: <img src="<?php echo htmlspecialchars($avaria['imagem']); ?>" alt="Imagem da avaria" width="100"></p>
                <input type="hidden" name="imagem_atual" value="<?php echo htmlspecialchars($avaria['imagem']); ?>">
            <?php endif; ?>

            <input type="submit" value="Salvar Alterações">
        </form>
    </main>
    <footer>
        <p>&copy; 2024 Checklist de Avarias. Todos os direitos reservados.</p>
    </footer>
</body>
</html>

<?php
$conn->close();
?>
