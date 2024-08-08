<?php
// Inclui o arquivo de configuração que deve conter as informações para conectar ao banco de dados.
include 'config.php';
session_start();

// Verifica se o usuário está logado, caso contrário, redireciona para a página de login.
if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit();
}

// Função para adicionar um checklist ao banco de dados
function adicionarChecklist($placa, $parte, $status) {
    global $conn;

    // Sanitiza os dados para prevenir SQL Injection
    $placa = htmlspecialchars($placa);
    $parte = htmlspecialchars($parte);
    $status = htmlspecialchars($status);

    // Prepara e executa a consulta SQL para inserir o checklist
    $stmt = $conn->prepare("INSERT INTO checklist (placa, parte, status) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $placa, $parte, $status);
    if (!$stmt->execute()) {
        die("Erro ao adicionar checklist: " . $stmt->error);
    }
    $stmt->close();
}

// Função para obter partes do veículo do banco de dados
function obterPartesVeiculo() {
    global $conn;
    $sql = "SELECT DISTINCT parte FROM checklist";
    $result = $conn->query($sql);
    if (!$result) {
        die("Erro ao obter partes do veículo: " . $conn->error);
    }
    return $result;
}

// Verifica se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $placa = $_POST['placa'];
    $partes = $_POST['partes'];

    foreach ($partes as $parte => $status) {
        adicionarChecklist($placa, $parte, $status);
    }

    // Redireciona para a página de visualização de checklists
    header('Location: lista_checklist.php');
    exit();
}

// Obtém as partes do veículo do banco de dados
$partes_result = obterPartesVeiculo();

// Obtém as placas dos veículos do banco de dados
$sql_placas = "SELECT placa FROM carros";
$result_placas = $conn->query($sql_placas);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checklist de Veículo</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .checklist-item {
            margin-bottom: 15px;
        }
        .checklist-item label {
            display: block;
            margin-bottom: 5px;
        }
        .checklist-item input[type="radio"] {
            margin-right: 10px;
        }
    </style>
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
        <h2>Checklist de Veículo</h2>
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
            <br>

            <h3>Partes do Veículo</h3>
            <?php
                // Lista de partes do veículo (pode ser obtida do banco de dados se preferir)
                $partes = ['Motor', 'Freios', 'Pneus', 'Portas L/E', 'Portas L/D', 'Faróis']; 

                foreach ($partes as $parte) {
                    echo "<div class='checklist-item'>
                            <label>{$parte}:</label>
                            <div class='item'><p>OK</p> <input type='radio' name='partes[{$parte}]' value='OK' required>  </div>
                            <div class='item'><p>Danificado</p> <input type='radio' name='partes[{$parte}]' value='Danificado' required> </div>
                        </div>";
                }
            ?>
            <br>
            <input type="submit" value="Enviar Checklist">
        </form>
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
