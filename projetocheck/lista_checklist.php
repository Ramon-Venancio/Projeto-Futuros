<?php
// Inclui o arquivo de configuração que deve conter as informações para conectar ao banco de dados.
include 'config.php';
session_start();

// Verifica se o usuário está logado, caso contrário, redireciona para a página de login.
if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit();
}

// Obtém os checklists do banco de dados com filtros
function obterChecklists($placa = null, $data = null) {
    global $conn;
    
    // Inicializa a consulta SQL
    $sql = "SELECT * FROM checklist WHERE 1=1";
    
    // Adiciona filtro para a placa, se fornecido
    if ($placa) {
        $placa = $conn->real_escape_string($placa);
        $sql .= " AND placa = '$placa'";
    }
    
    // Adiciona filtro para a data, se fornecida
    if ($data) {
        // Verifica se a data está em um formato válido (YYYY-MM-DD)
        $data_formatada = DateTime::createFromFormat('d/m/Y', $data);
        if ($data_formatada) {
            $data_formatada = $data_formatada->format('Y-m-d');
            $sql .= " AND DATE(data) = '$data_formatada'";
        } else {
            // Se a data não for válida, não adicionar filtro
            $sql .= " AND 1=1"; // Filtro que sempre é verdadeiro, para evitar problemas
        }
    }

    // Executa a consulta SQL
    $result = $conn->query($sql);
    if (!$result) {
        die("Erro ao obter checklists: " . $conn->error);
    }
    return $result;
}

// Obtém os filtros da requisição
$placa_filtro = isset($_GET['placa']) ? $_GET['placa'] : null;
$data_filtro = isset($_GET['data']) ? $_GET['data'] : null;

// Obtém os checklists do banco de dados
$checklists_result = obterChecklists($placa_filtro, $data_filtro);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visualização de Checklists</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
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
        <h2>Visualização de Checklists</h2>
        <!-- Formulário de Filtragem -->
        <form method="get" action="lista_checklist.php">
            <label for="placa">Placa:</label>
            <input type="text" id="placa" name="placa" value="<?php echo isset($placa_filtro) ? htmlspecialchars($placa_filtro) : ''; ?>">
            <label for="data">Data:</label>
            <input type="text" id="data" name="data" value="<?php echo isset($data_filtro) ? htmlspecialchars($data_filtro) : ''; ?>" placeholder="dd/mm/aaaa">
            <button type="submit">Filtrar</button>
        </form>
        <table>
            <tr>
                <th>Placa</th>
                <th>Parte</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ação</th>
            </tr>
            <?php
                if ($checklists_result->num_rows > 0) {
                    while ($row = $checklists_result->fetch_assoc()) {
                        // Verifica se a chave 'status' existe no array $row e se o valor não é 'OK'
                        $status = isset($row['status']) ? $row['status'] : 'Desconhecido';
                        if ($status !== 'OK') {
                            $status = 'Danificado';
                        }

                        // Formata a data para dd/mm/aaaa
                        $data_formatada = isset($row['data']) ? (new DateTime($row['data']))->format('d/m/Y') : 'Data não disponível';

                        echo "<tr>
                                <td>{$row['placa']}</td>
                                <td>{$row['parte']}</td>
                                <td>$status</td>
                                <td>$data_formatada</td>";
                        echo "<td>";
                        // Adiciona um botão para redirecionar para avarias.php se o status for "Danificado"
                        if ($status === 'Danificado') {
                            echo "<a href='avarias.php'><button>Reportar Avaria</button></a>";
                        }
                        echo "</td></tr>";
                    }
                } else {
                    echo "<tr><td colspan='5'>Nenhum checklist encontrado.</td></tr>";
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
