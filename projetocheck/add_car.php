<?php
// Inclui o arquivo de configuração para conectar ao banco de dados
include 'config.php';

// Verifica se o método de requisição é POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $placa = $_POST['placa'];
    $modelo = $_POST['modelo'];
    $marca = $_POST['marca'];
    $ano = $_POST['ano'];

    // Prepara a consulta SQL para inserir um novo veículo na tabela 'carros'
    $stmt = $conn->prepare("INSERT INTO carros (placa, modelo, marca, ano) VALUES (?, ?, ?, ?)");
    if ($stmt) {
        // Liga as variáveis aos parâmetros da consulta
        $stmt->bind_param("ssss", $placa, $modelo, $marca, $ano);
        
        // Executa a consulta SQL e verifica se foi bem-sucedida
        if ($stmt->execute()) {
            // Redireciona para a página inicial se a inserção foi bem-sucedida
            header('Location: index.php');
            exit(); // Encerra o script após o redirecionamento
        } else {
            // Exibe uma mensagem de erro se a inserção falhar
            echo "Erro: " . $stmt->error;
        }
        
        // Fecha a consulta preparada
        $stmt->close();
    } else {
        // Exibe uma mensagem de erro se a preparação da consulta falhar
        echo "Erro: " . $conn->error;
    }
}

// Fecha a conexão com o banco de dados
$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Adicionar Veículo</title>
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
        <a href="avarias.php">Avarias de Veículos</a>
        <a href="lista_avarias.php">Lista de Avarias</a>
        <a href="pesquisa.php">Pesquisa</a> 
        <a href="logout.php">Sair</a> <!-- Botão de logout -->
        </ul>
    </nav>
    <main>
        <h2>Cadastrar Novo Veículo</h2>
        <form method="post" action="">
            <div>
                <label for="placa">Placa do Veículo:</label><br>
                <input type="text" name="placa" placeholder="Ex.: ABC9999" required>
            </div>
            <div>
                <label for="modelo">Modelo do Veículo:</label><br>
                <input type="text" name="modelo" required>
            </div>
            <div>
                <label for="marca">Marca do Veículo:</label><br>
                <input type="text" name="marca" required>
            </div>
            <div>
                <label for="ano">Ano do Veículo:</label><br>
                <input type="text" name="ano" pattern="\d{4}/\d{4}" placeholder="Ex.: 9999/9999" required>
            </div>
            <input type="submit" value="Adicionar Veículo">
        </form>
    </main>
    <footer>
        <p>&copy; 2024 Sistema de Checklist Veicular. Todos os direitos reservados.</p>
    </footer>
</body>
</html>
