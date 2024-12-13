let historicoManutencao = ''
let veiculos = ''
let avarias = ''
const token = localStorage.getItem("authToken")

document.addEventListener('DOMContentLoaded', async () => {
    carregarManutencoes()
})

async function carregarManutencoes() {
    const response = await fetch('http://localhost:3000/api/manutencoes', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    historicoManutencao = await response.json()
    await carregarVeiculos()
    await carregarAvarias()

    const accordion = document.getElementById('manutencaoAccordion');


    historicoManutencao.forEach(item => {
        const veiculo = veiculos.find(veiculo => veiculo.id === item.idVeiculo)

        const accordionItem = `
                    <div class="accordion-item bg-secondary text-white">
                        <h2 class="accordion-header" id="heading${item.id}">
                            <button class="accordion-button collapsed bg-secondary text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${item.id}" aria-expanded="false" aria-controls="collapse${item.id}">
                                <div class="container-fluid d-flex justify-content-between ">
                                    <span>${veiculo.marca} ${veiculo.modelo}</span><span class="${item.finalizado ? 'text-success':'text-danger'}">${item.finalizado? 'Concluido': 'Pendente'}</span>
                                </div>
                            </button>
                        </h2>
                        <div id="collapse${item.id}" class="accordion-collapse collapse" aria-labelledby="heading${item.id}" data-bs-parent="#manutencaoAccordion">
                            <div class="accordion-body d-flex justify-content-between align-items-center text-white">
                                ${item.detalhes ? item.detalhes: ''}
                                <ul class="list-group mb-3">
                                ${item.idAvarias.map((id) => {
                                    const avaria = avarias.find(avaria => id === avaria.id)
                                    return `
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        ${avaria.localizacao}: ${avaria.descricao} (${avaria.data})
                                    </li> 
                                    `
                                }).join('')}
                                </ul>
                                <div class="d-flex flex-column">
                                    <button class="btn btn-sm btn-warning mb-3">Editar</button>
                                    <button class="btn btn-sm btn-danger">Deletar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

        accordion.innerHTML += accordionItem
    });
}

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

        veiculos = await response.json()
    } catch (error) {
        console.error("Erro ao carregar veículos:", error);
    }
}

async function carregarAvarias() {
    try {
        const response = await fetch('http://localhost:3000/api/avarias', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
    
        if (!response.ok) {
            console.error(`Erro: ${response.status} - ${response.statusText}`)
            return
        }
        avarias = await response.json()
    } catch (error) {
        console.error("Erro ao carregar veículos:", error);
    }
}

function editManutencao () {

}

function deletarManutencao () {

}