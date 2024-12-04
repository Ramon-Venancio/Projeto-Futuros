// Dados simulados para a tabela
const avarias = [
    { id: 1, placa: "ABC1234", localizacao: "Frontal", descricao: "Amassado no para-choque", data: "2024-11-20" },
    { id: 2, placa: "XYZ5678", localizacao: "Traseira", descricao: "Risco na pintura", data: "2024-11-18" },
    { id: 3, placa: "LMN2345", localizacao: "Lateral Esquerda", descricao: "Vidro quebrado", data: "2024-11-15" }
];

// Função para renderizar as avarias na tabela
function renderAvarias(avarias) {
    const tableBody = document.getElementById('avariasTableBody');
    tableBody.innerHTML = '';

    avarias.forEach(avaria => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${avaria.id}</td>
                <td>${avaria.placa}</td>
                <td>${avaria.localizacao}</td>
                <td>${avaria.descricao}</td>
                <td>${avaria.data}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarAvaria(${avaria.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="excluirAvaria(${avaria.id})">Excluir</button>
                </td>
            `;
        tableBody.appendChild(row);
    });
}

// Filtrar a tabela pelo campo de pesquisa
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredAvarias = avarias.filter(avaria =>
        avaria.placa.toLowerCase().includes(searchValue)
    );
    renderAvarias(filteredAvarias);
});

// Funções de ações (exemplo)
function editarAvaria(id) {
    alert(`Editar avaria com ID: ${id}`);
    // Implementar lógica para edição
}

function excluirAvaria(id) {
    if (confirm(`Deseja excluir a avaria com ID: ${id}?`)) {
        alert(`Avaria com ID: ${id} excluída`);
        // Implementar lógica para exclusão
    }
}

// Renderizar a tabela inicial
renderAvarias(avarias);