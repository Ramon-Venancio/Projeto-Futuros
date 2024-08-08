<?php
    // Inclui o arquivo de configuração que deve conter as informações para conectar ao banco de dados.
    include 'config.php';
    session_start();

    // Verifica se o usuário está logado, caso contrário, redireciona para a página de login.
    if (!isset($_SESSION['username'])) {
        header('Location: login.php');
        exit();
    }

    // Função para adicionar uma avaria ao banco de dados
    function adicionarAvaria($placa, $localizacao, $descricao, $imagem) {
        global $conn;

        // Prepara e executa a consulta SQL para inserir a avaria
        $stmt = $conn->prepare("INSERT INTO avarias (placa, localizacao, descricao, imagem) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $placa, $localizacao, $descricao, $imagem);
        $stmt->execute();
        $stmt->close();
    }

    // Função para deletar uma avaria do banco de dados
    function deletarAvaria($id) {
        global $conn;

        // Prepara e executa a consulta SQL para deletar a avaria
        $stmt = $conn->prepare("DELETE FROM avarias WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
    }

    // Verifica se o formulário foi enviado
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $placa = $_POST['placa'];
        $localizacao = $_POST['localizacao'];
        $descricao = $_POST['avarias'];
        $imagem = '';

        // Verifica se um arquivo foi enviado
        if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
            $imagem = 'uploads/' . basename($_FILES['imagem']['name']);
            move_uploaded_file($_FILES['imagem']['tmp_name'], $imagem);
        }

        adicionarAvaria($placa, $localizacao, $descricao, $imagem);

        // Redireciona para evitar o reenvio do formulário
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit();
    }

    // Verifica se uma solicitação de exclusão foi feita
    if (isset($_GET['delete'])) {
        $id = intval($_GET['delete']);
        deletarAvaria($id);
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit();
    }

    // Obtém as avarias do banco de dados
    $sql = "SELECT * FROM avarias";
    $result = $conn->query($sql);

    // Obtém as placas dos veículos do banco de dados
    $sql_placas = "SELECT placa FROM carros";
    $result_placas = $conn->query($sql_placas);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checklist de Avarias</title>
    <link rel="stylesheet" href="styles.css">
    <script>
        function confirmDelete(id) {
            if (confirm("Deseja realmente excluir esta avaria?")) {
                window.location.href = "?delete=" + id;
            }
        }
    </script>
</head>
<body>
    <!-- Cabeçalho -->
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
            <a href="logout.php">Sair</a> <!-- Botão de logout -->
        </ul>
    </nav>
    <main>
        <h2>Lista de Avarias</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Placa</th>
                <th>Localização</th>
                <th>Descrição</th>
                <th>Imagem</th>
                <th>Criado em</th>
                <th>Ação</th>
            </tr>
            <?php
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>{$row['id']}</td>
                                <td>{$row['placa']}</td>
                                <td>{$row['localizacao']}</td>
                                <td>{$row['descricao']}</td>
                                <td>" . (!empty($row['imagem']) ? "<img src='{$row['imagem']}' alt='Imagem da avaria' width='100'>" : "Nenhuma imagem") . "</td>
                                <td>" . date('d/m/Y', strtotime($row['criado_em'])) . "</td>
                                <td>
                                    <a href='editar_avaria.php?id={$row['id']}'>Editar</a>
                                    <a href='#' onclick='confirmDelete({$row['id']})'>Excluir</a>
                                </td>
                            </tr>";
                    }
                } else {
                    echo "<tr><td colspan='7'>Nenhuma avaria encontrada.</td></tr>";
                }
            ?>
        </table>
    </main>
    <footer>
        <p>&copy; 2024 Checklist de Avarias. Todos os direitos reservados.</p>
    </footer>
</body>
</html>

<?php
// Fecha a conexão com o banco de dados
$conn->close();
?>
