<?php
// Defina o nome do servidor do banco de dados
$servername = "localhost"; 

// Defina o nome de usuário para acessar o banco de dados, "root" é o padrão para muitos sistemas de gerenciamento de banco de dados MySQL.
$username = "root"; 

 // Defina a senha para acessar o banco de dados, Aqui está vazia, que é comum em configurações de desenvolvimento.
$password = "";  

 // Defina o nome do banco de dados ao qual se conectar
$dbname = "projetocheck"; 

// Criar conexão com o banco de dados usando mysqli , nova instância de conexão com o banco de dados MySQL usando as credenciais fornecidas.

$conn = new mysqli($servername, $username, $password, $dbname);

 // Checar se houve algum erro na conexão
if ($conn->connect_error) { 
    
    die("Connection failed: " . $conn->connect_error); // Se houver um erro, exibe uma mensagem de erro e encerra a execução do script.
}
?>

