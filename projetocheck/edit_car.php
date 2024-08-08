<?php
    // Inclui o arquivo de configuração que contém a conexão com o banco de dados
    include 'config.php';

    // Obtém o ID do produto a ser editado a partir da URL
    $id = $_GET['id'];

    // Verifica se o formulário foi enviado usando o método POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Obtém os valores do formulário enviados via POST
        $placa = $_POST['placa'];
        $modelo = $_POST['modelo'];
        $marca = $_POST['marca'];
        $ano = $_POST['ano'];

        // Cria a consulta SQL para atualizar os dados do produto
        $sql = "UPDATE carros SET placa='$placa', modelo='$modelo', marca='$marca', ano='$ano' WHERE id=$id";
        
        // Executa a consulta SQL e verifica se a atualização foi bem-sucedida
        if ($conn->query($sql) === TRUE) {
            // Redireciona para a página inicial se a atualização foi bem-sucedida
            header('Location: index.php');
            exit(); // Encerra o script após o redirecionamento
        } else {
            // Exibe uma mensagem de erro se a atualização falhar
            echo "Erro: " . $conn->error;
        }
    }

    // Cria a consulta SQL para selecionar os dados do produto a ser editado
    $sql = "SELECT * FROM carros WHERE id=$id";
    // Executa a consulta SQL
    $result = $conn->query($sql);
    // Obtém os dados do produto como um array associativo
    $placa = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Editar Veículos</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<header>
    <img src="logo.png" alt="Logo da Empresa">
    <h1><a href="index.php">Sistema de Checklist Veicular</a></h1>
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
    <h2>Editar Veículo</h2>

    <!-- Formulário para edição do veículo -->
    <form method="post" action="">
        <div>
            <label for="placa">Placa:</label>
            <input type="text" name="placa" value="<?php echo htmlspecialchars($placa['placa']); ?>" required>
        </div>
        <div>
            <label for="modelo">Modelo:</label>
            <input type="text" name="modelo" value="<?php echo htmlspecialchars($placa['modelo']); ?>" required>
        </div>
        <div>
            <label for="marca">Marca:</label>
            <input type="text" name="marca" value="<?php echo htmlspecialchars($placa['marca']); ?>" required>
        </div>
        <div>
            <label for="ano">Ano:</label>
            <input type="text" name="ano" pattern="\d{4}/\d{4}" value="<?php echo htmlspecialchars($placa['ano']); ?>" required>
        </div>
        <input type="submit" value="Atualizar Veículo">
    </form>
</main>
<footer>
    <p>&copy; 2024 Sistema de Checklist Veicular. Todos os direitos reservados.</p>
</footer>
</body>
</html>

<?php
// Fecha a conexão com o banco de dados
$conn->close();
?>
