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
    accordion.innerHTML = ''
    console.log("Passou aqui")


    historicoManutencao.forEach((item, index) => {
        const veiculo = veiculos.find(veiculo => veiculo.id === item.idVeiculo)

        const accordionItem = `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${item.id}">
                            <button class="accordion-button collapsed bg-secondary bg-opacity-50 p-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${item.id}" aria-expanded="false" aria-controls="collapse${item.id}">
                                <div class="container-fluid d-flex justify-content-between">
                                    <div>${veiculo.marca} ${veiculo.modelo}</div>
                                    <div>${item.data}</div>
                                    <span class="${item.finalizado ? 'badge bg-success bg-opacity-50 p-2':'badge bg-danger bg-opacity-50 p-2'}">${item.finalizado? 'Concluido': 'Pendente'}</span>
                                </div>
                            </button>
                        </h2>
                        <div id="collapse${item.id}" class="accordion-collapse collapse" aria-labelledby="heading${item.id}" data-bs-parent="#manutencaoAccordion">
                            <div class="accordion-body d-flex justify-content-between align-items-center">
                                ${item.detalhes ? item.detalhes: ''}
                                <div>
                                    <h5>Avarias</h5>
                                    <ul class="list-group mb-3">
                                    ${item.idAvarias.map((id) => {
                                        const avaria = avarias.find(avaria => id === avaria.id)
                                        return `
                                        <li class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
                                            ${avaria.localizacao}: ${avaria.descricao} (${avaria.data})
                                        </li>
                                        `
                                    }).join('')}
                                    </ul>
                                </div>
                                <div class="d-flex flex-column">
                                    <h5>Ações</h5>
                                    <div class="dropdown ms-4">
                                        <button type="button" class="btn btn-sm btn-warning mb-1 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" onclick="editManutencao(${index})">
                                            Editar
                                        </button>
            
                                        <form class="dropdown-menu p-4" id="manutencaoForm${index}">
                                            <div class="mb-3">
                                                <label for="dataAvaria" class="form-label">
                                                Data de Agendamento
                                                </label>
                                                <input type="date" class="form-control" id="dataAgendamento${index}" required>
                                            </div>
                                            <button type="submit" class="btn btn-primary">
                                                Salvar
                                            </button>
                                        </form>
                                    </div>
                                    <button class="btn btn-sm btn-danger mb-1" onclick="deletarManutencao(${index})">Deletar</button>
                                    ${item.finalizado ? '':`<button class="btn btn-sm btn-success" onclick="concluirAgendamento(${index})">Concluir</button>`}
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

async function editManutencao (indexManutencao) {
    let manutencao = historicoManutencao[indexManutencao]

    document.getElementById(`dataAgendamento${indexManutencao}`).value = manutencao.data

    document.getElementById(`manutencaoForm${indexManutencao}`).onsubmit = async (e) => {
        e.preventDefault()
        const novoValor = {data: document.getElementById(`dataAgendamento${indexManutencao}`).value}

        try {
            const response = await fetch(`http://localhost:3000/api/manutencoes/${manutencao.id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(novoValor)
            })

            if (!response.ok) {
                const errorData = await response.json()
                alert(`Error: ${errorData.error}`)
                console.error(`Erro: ${response.status} - ${response.statusText}`)
                return
            }

            alert('Manutenção editada com sucesso')
            document.getElementById(`manutencaoForm${indexManutencao}`).reset()
            await carregarManutencoes()
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Ocorreu um erro ao tentar agendar a manutenção.");
        }
    }
}

async function deletarManutencao (indexManutencao) {
    const manutencao = historicoManutencao[indexManutencao]
    try {
        const response = await fetch(`http://localhost:3000/api/manutencoes/${manutencao.id}`, {
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

        alert('Manutenção deletada com sucesso')
        await carregarManutencoes()
    } catch (error) {
            console.error("Erro ao processar as requisições:", error)
            alert("Erro ao deletar avaria.")
    }
}

async function concluirAgendamento (indexManutencao) {
    const manutencao = historicoManutencao[indexManutencao]
    console.log("entrou")
    
    const novoValor = {finalizado: true}

    try {
        const response = await fetch(`http://localhost:3000/api/manutencoes/${manutencao.id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(novoValor)
        })

        if (!response.ok) {
            const errorData = await response.json()
            alert(`Error: ${errorData.error}`)
            console.error(`Erro: ${response.status} - ${response.statusText}`)
            return
        }

        alert('Manutenção concluida com sucesso')
        await carregarManutencoes()
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro ao tentar agendar a manutenção.");
    }

}