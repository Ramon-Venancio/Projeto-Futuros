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
        <a href="index.php">Home</a> 
        <a href="add_car.php">Cadastro de Veículos</a>
        <a href="avarias.php">Avarias de Veículos</a>
        <a href="lista_avarias.php">Lista de Avarias</a>
        <a href="pesquisa.php">Pesquisa</a> 
        <a href="logout.php">Sair</a> <!-- Botão de logout -->
    </nav>
    <main>
        <h2>Nova Avaria</h2>
        <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" enctype="multipart/form-data">
            <label for="placa">Placa do Veículo:</label>
            <select id="placa" name="placa" required>
                <option value="">Selecione</option>
                <?php
                if ($result_placas->num_rows > 0) {
                    while ($row = $result_placas->fetch_assoc()) {
                        echo "<option value='{$row['placa']}'>{$row['placa']}</option>";
                    }
                }
                ?>
            </select>

            <label for="localizacao">Localização da Avaria:</label>
            <select id="localizacao" name="localizacao" required>
                <option value="">Selecione</option>
                <option value="Frente">Frente</option>
                <option value="Traseira">Traseira</option>
                <option value="Lateral Esquerda">Lateral Esquerda</option>
                <option value="Lateral Direita">Lateral Direita</option>
                <option value="Interior">Interior</option>
            </select>

            <label for="avarias">Descreva as Avarias:</label>
            <textarea id="avarias" name="avarias" rows="4" required></textarea>

            <label for="imagem">Anexe uma Imagem da Avaria:</label>
            <input type="file" id="imagem" name="imagem" accept="image/*">

            <input type="submit" value="Adicionar Avaria">
        </form>
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
