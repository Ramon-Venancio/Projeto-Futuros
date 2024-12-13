// Dados de veículos simulados
let veiculos = '';
const token = localStorage.getItem("authToken");
let currentIndex = 0; // Índice inicial
const itemsPerPage = 15; // Quantos itens mostrar por vez

const tableBody = document.getElementById("vehicleTableBody");
const loadMoreButton = document.getElementById("loadMoreButton");
const searchInput = document.getElementById("searchInput");

document.addEventListener('DOMContentLoaded', async () => {
    // Inicializar tabela com os primeiros 15 veículos
    await carregarVeiculos();
});

// Função para exibir veículos na tabela
function popularTabela(data, start = 0, limit = itemsPerPage) {
    const slice = data.slice(start, start + limit);
    slice.forEach((veiculo, index) => {
        const row = `
            <tr>
                <td>${veiculo.id}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.modelo}</td>
                <td>${veiculo.ano}</td>
                <td>${veiculo.marca}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editVeiculo(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm ms-2" onclick="deleteVeiculo(${index})">Excluir</button>
                </td>
            </tr>
        `
        tableBody.innerHTML += row
    });
}

// Função para carregar mais veículos
async function carregarVeiculos() {
    try {
        const response = await fetch('http://localhost:3000/api/veiculos', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            console.error(`Erro: ${response.status} - ${response.statusText}`);
            return;
        }

        veiculos = await response.json();

        if (veiculos.length < itemsPerPage) {
            loadMoreButton.style.display = "none"
        }
        if (currentIndex < veiculos.length) {
            popularTabela(veiculos, currentIndex, itemsPerPage);
        }
        if (currentIndex >= veiculos.length) {
            loadMoreButton.style.display = "none"; // Oculta o botão se não houver mais itens
        }
    } catch (error) {
        console.error("Erro ao carregar veículos:", error);
    }
}

// Função para filtrar veículos
function filterVehicles() {
    const query = searchInput.value.toLowerCase();
    const filtered = veiculos.filter(veiculo =>
        veiculo.modelo.toLowerCase().includes(query) ||
        veiculo.marca.toLowerCase().includes(query) ||
        veiculo.placa.toLowerCase().includes(query)
    );
    tableBody.innerHTML = ""; // Limpa a tabela
    currentIndex = 0; // Reseta o índice
    popularTabela(filtered, 0, itemsPerPage); // Mostra os primeiros 15 resultados
    loadMoreButton.style.display = filtered.length > itemsPerPage ? "" : "none";
}

function editVeiculo(veiculoIndex) {
    const veiculo = veiculos[veiculoIndex]

    document.getElementById('veiculoPlaca').value = veiculo.placa
    document.getElementById('veiculoModelo').value = veiculo.modelo
    document.getElementById('marcaVeiculo').value = veiculo.marca
    document.getElementById('anoVeiculo').value = veiculo.ano

    const modal = new bootstrap.Modal(document.getElementById('veiculoModal'))
    modal.show()

    document.getElementById('veiculoForm').onsubmit = async (e) => {
        e.preventDefault()
        veiculo.placa = document.getElementById('veiculoPlaca').value
        veiculo.modelo = document.getElementById('veiculoModelo').value
        veiculo.marca = document.getElementById('marcaVeiculo').value
        veiculo.ano = document.getElementById('anoVeiculo').value

        // Simular requisição ao back-end para atualizar avaria
        await fetch(`http://localhost:3000/api/veiculos/${veiculo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(veiculo)
        });

        modal.hide()
        setTimeout(() => {
            alert("Veiculo editado com sucesso!")
            console.log("Veículo atualizado.")
            tableBody.innerHTML = ""
            carregarVeiculos()
        }, 100)
    }
    
}

// Eventos
loadMoreButton.addEventListener("click", () => {
    currentIndex += itemsPerPage;
    carregarVeiculos()

})

async function deleteVeiculo(veiculoIndex) {
    const veiculo = veiculos[veiculoIndex]

    const response = await fetch(`http://localhost:3000/api/veiculos/${veiculo.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    if (!response.ok) {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
        console.error(`Erro: ${response.status} - ${response.statusText}`)
        return
    }

    tableBody.innerHTML = ""
    carregarVeiculos()
}
searchInput.addEventListener("input", filterVehicles);