<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);


    // Inclui o arquivo de configuração que deve conter as informações para conectar ao banco de dados.
    include 'config.php';
    session_start();
        
    // Verifica se o usuário está logado, caso contrário, redireciona para a página de login.
    if (!isset($_SESSION['username'])) {
        header('Location: login.php');
        exit();
    }

    // Obter carros - Define a consulta SQL para selecionar todos os produtos da tabela 'carros'.
    $sql = "SELECT * FROM carros";

    // Executa a consulta SQL no banco de dados e armazena o resultado na variável $result.
    $result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8"> 
    <title>Sistema de Checklist Veicular</title> 
    <link rel="stylesheet" href="styles.css"> 

    <script>
        function confirmDelete(id) {
            if (confirm("Deseja realmente excluir este veículo?")) {
                window.location.href = "delete_car.php?id=" + id;
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
    <!--Conteúdo -->
    <main>
        <h2>Lista de Veículos</h2> 
        <table>
            <tr>
                <!-- Cabeçalhos das colunas da tabela -->
                <th>ID</th> <!-- Cabeçalho da coluna para o ID do veículo. -->
                <th>Placa</th> <!-- Cabeçalho da coluna para a placa do veículo. -->
                <th>Modelo</th> <!-- Cabeçalho da coluna para o modelo do veículo. -->
                <th>Marca</th> <!-- Cabeçalho da coluna para a marca do veículo. -->
                <th>Ano</th> <!-- Cabeçalho da coluna para o ano do veículo. -->
                <th>Ações</th> <!-- Cabeçalho da coluna para ações disponíveis (editar e excluir). -->
            </tr>
            <?php
                if ($result->num_rows > 0) { // Verifica se a consulta retornou algum resultado.
                    while($row = $result->fetch_assoc()) { // Percorre cada linha do resultado da consulta.
                        // Cria uma linha da tabela para cada veículo retornado pela consulta.
                        echo "<tr>
                            <td>{$row['id']}</td> <!-- Exibe o ID do veículo. -->
                            <td>{$row['placa']}</td> <!-- Exibe a placa do veículo. -->
                            <td>{$row['modelo']}</td> <!-- Exibe o modelo do veículo. -->
                            <td>{$row['marca']}</td> <!-- Exibe a marca do veículo. -->
                            <td>{$row['ano']}</td> <!-- Exibe o ano do veículo. -->
                            <td>
                                <a href='edit_car.php?id={$row['id']}'>Editar</a> | <!-- Link para editar o veículo, passando o ID como parâmetro. -->
                                <a href='#' onclick='confirmDelete({$row['id']})'>Excluir</a> <!-- Link para excluir o veículo, passando o ID como parâmetro. -->
                            </td>
                        </tr>";
                    }
                } else {
                    // Se nenhum veículo for encontrado, exibe uma mensagem na tabela.
                    echo "<tr><td colspan='6'>Nenhum veículo encontrado</td></tr>";
                }
            ?>
        </table>
    </main>
    <footer>
        <p>&copy; 2024 Sistema de Checklist Veicular. Todos os direitos reservados.</p> 
    </footer>
</body>
</html>

<?php $conn->close(); ?> <!-- Fecha a conexão com o banco de dados. -->
