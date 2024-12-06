let veiculos = ''
let avarias = ''
const token = localStorage.getItem("authToken")

document.addEventListener('DOMContentLoaded', async () => {
    renderVeiculos()
})

const opcoes = {
    externo: ["Frontal", "Traseira", "Lateral Direita", "Lateral Esquerda", "Teto", "Rodas e Pneus", "Vidros"],
    interno: ["Painel", "Bancos", "Volante", "Portas Internas", "Ar Condicionado", "Teto Interno"],
    mecanico: ["Motor", "Suspensao", "Freios", "Transmissao", "Sistema Eletrico"],
    sistemas: ["Sistema de Navegacão", "Audio", "Sensores"]
}

document.getElementById('categoriaSelect').addEventListener('change', function () {
    const categoria = this.value
    const localizacaoSelect = document.getElementById('localizacaoSelect')
    localizacaoSelect.innerHTML = `<option value="" disabled selected>Selecione uma localidade</option>`

    if (categoria && opcoes[categoria]) {
        opcoes[categoria].forEach(local => {
            const option = document.createElement('option')
            option.value = local.toLowerCase()
            option.textContent = local
            localizacaoSelect.appendChild(option)
        })
        localizacaoSelect.disabled = false
    } else {
        localizacaoSelect.disabled = true
    }
})

async function renderVeiculos() {
    const responseVeiculos = await fetch('http://localhost:3000/api/veiculos', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    if (!responseVeiculos.ok) {
        console.error(`Erro: ${responseVeiculos.status} - ${responseVeiculos.statusText}`)
        return
    }
    veiculos = await responseVeiculos.json()


    const responseAvarias = await fetch('http://localhost:3000/api/avarias', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    if (!responseAvarias.ok) {
        console.error(`Erro: ${responseAvarias.status} - ${responseAvarias.statusText}`)
        return
    }
    avarias = await responseAvarias.json()

    const container = document.getElementById('veiculos-lista');
    container.innerHTML = ''; // Limpa o conteúdo atual

    veiculos.forEach((veiculo, index) => {
        if (veiculo.avarias && veiculo.avarias.length > 0) {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
            <div class="card-header"><h4>${veiculo.modelo} - ${veiculo.placa}</h4></div>
        
            <div class="card-body">
                <div id="accordionExample-${index}" class="accordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading-${index}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
                            Avarias
                        </button>
                        </h2>
                        <div id="collapse-${index}" class="accordion-collapse collapse" aria-labelledby="heading-${index}" data-bs-parent="#accordionExample-${index}">
                        <div class="accordion-body">
                            <ul class="list-group mb-3">
                            ${veiculo.avarias.map((id, indexAvaria) => {
                                const avaria = avarias.find(avaria => avaria.id === id)
                                return `
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                ${avaria.localizacao}: ${avaria.descricao} (${avaria.data})
                                <div>
                                    <button class="btn btn-sm btn-warning me-2" onclick="editAvaria(${index}, ${id})">
                                    Editar
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="deleteAvaria(${index}, ${indexAvaria}, ${id})">
                                    Deletar
                                    </button>
                                </div>
                                </li>
                                `
                            }).join('')}
                            </ul>
                            <div class="d-flex">
                                <button class="btn btn-secondary" onclick="addAvaria(${index})">
                                    Adicionar Avaria
                                </button>
                                <div class="dropdown ms-4">
                                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                    Agendar Manuntenção
                                    </button>
        
                                    <form class="dropdown-menu p-4" id="manutencaoForm">
                                        <div class="mb-3">
                                            <label for="dataAvaria" class="form-label">
                                            Data de Agendamento
                                            </label>
                                            <input type="date" class="form-control" id="dataAgendamento" required>
                                        </div>
                                        <button type="submit" class="btn btn-primary">
                                            Agendar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            `
            container.appendChild(card);
        }        
    });
}

// Adicionar nova avaria
function addAvaria(veiculoIndex) {
    const veiculo = veiculos[veiculoIndex]
    document.getElementById('avariaModalLabel').innerHTML = 'Adicionar Avaria'
    document.getElementById('veiculoPlaca').value = veiculo.placa

    document.getElementById('categoriaSelect').value = ''
    document.getElementById('localizacaoSelect').value = ''
    document.getElementById('localizacaoSelect').disabled = true
    document.getElementById('descricaoAvaria').value = ''
    document.getElementById('dataAvaria').value = ''

    const modal = new bootstrap.Modal(document.getElementById('avariaModal'))
    modal.show()

    document.getElementById('avariaForm').onsubmit = async (e) => {
        e.preventDefault()

        const avaria = {
            idVeiculo: veiculo.id,
            placa: document.getElementById('veiculoPlaca').value.trim(),
            localizacao: document.getElementById('localizacaoSelect').value,
            descricao: document.getElementById('descricaoAvaria').value.trim(),
            data: document.getElementById('dataAvaria').value.trim(),
        }

        try {
            // Simular requisição ao back-end para salvar avaria
            const responseAvaria = await fetch(`http://localhost:3000/api/avarias/${veiculo.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(avaria)
            });

            if (!responseAvaria.ok) {
                const errorData = await responseAvaria.json()
                alert(`Error: ${errorData.error}`)
                console.error(`Erro: ${responseAvaria.status} - ${responseAvaria.statusText}`)
                return
            }
            const avariaCriada = await responseAvaria.json()

            veiculo.avarias.push(avariaCriada.id)

            const responseVeiculo = await fetch(`http://localhost:3000/api/veiculos/${veiculo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(veiculo),
            })

            if (!responseVeiculo.ok) {
                const errorData = await responseVeiculo.json()
                alert(`Error: ${errorData.error}`)
                console.error(`Erro: ${responseVeiculo.status} - ${responseVeiculo.statusText}`)
                return
            }

            modal.hide()
            setTimeout(() => {
                alert("Avaria adicionada com sucesso!")
                console.log("Avaria e veículo atualizados.")
                renderVeiculos()
            }, 100);
        } catch (error) {
            console.error("Erro ao processar as requisições:", error)
            alert("Erro ao adicionar avaria.")
        }
    }
}

// Editar avaria existente
function editAvaria(veiculoIndex, avariaID) {
    const veiculo = veiculos[veiculoIndex]
    const avaria = avarias.find(avaria => avaria.id === avariaID)

    document.getElementById('avariaModalLabel').innerHTML = 'Adicionar Avaria'

    document.getElementById('veiculoPlaca').value = veiculo.placa
    for (const [key, value] of Object.entries(opcoes)) {
        value.forEach(localizacao => {
            if (localizacao.toLocaleLowerCase().trim() === avaria.localizacao.trim()) {
                document.getElementById('categoriaSelect').value = key
                document.getElementById('categoriaSelect').dispatchEvent(new Event('change'))
            }
        })
    }
    document.getElementById('localizacaoSelect').value = avaria.localizacao
    document.getElementById('descricaoAvaria').value = avaria.descricao
    document.getElementById('dataAvaria').value = avaria.data

    const modal = new bootstrap.Modal(document.getElementById('avariaModal'))
    modal.show()

    document.getElementById('avariaForm').onsubmit = async (e) => {
        e.preventDefault()
        avaria.localizacao = document.getElementById('localizacaoSelect').value
        avaria.descricao = document.getElementById('descricaoAvaria').value
        avaria.data = document.getElementById('dataAvaria').value

        // Simular requisição ao back-end para atualizar avaria
        await fetch(`http://localhost:3000/api/avarias/${avariaID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(avaria)
        });

        modal.hide();
        renderVeiculos();
    };
}

// Agendar manutenção
document.body.addEventListener('submit', async (e) => {
    if (e.target && e.target.id === 'manutencaoForm') {
        e.preventDefault();
        console.log("entrou")
        const veiculo = ''
        const manutencao = {
            idVeiculo: veiculo.id,
            idAvarias: veiculo.avarias,
            data: document.getElementById('dataAgendamento').value,
            finalizado: false
        };

        try {
            const response = await fetch(`http://localhost:3000/api/manutencoes`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(manutencao)
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
                console.error(`Erro: ${response.status} - ${response.statusText}`);
                return;
            }

            alert('Manutenção agendada com sucesso');
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Ocorreu um erro ao tentar agendar a manutenção.");
        }
    }
})

// Deletar avaria
async function deleteAvaria(veiculoIndex, avariaIndex, avariaID) {
    try {
        const responseAvaria = await fetch(`http://localhost:3000/api/avarias/${avariaID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        if (!responseAvaria.ok) {
            const errorData = await responseAvaria.json()
            alert(`Error: ${errorData.error}`)
            console.error(`Erro: ${responseAvaria.status} - ${responseAvaria.statusText}`)
            return
        }

        const veiculo = veiculos[veiculoIndex]
        veiculo.avarias.splice(avariaIndex, 1)

        const responseVeiculo = await fetch(`http://localhost:3000/api/veiculos/${veiculo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(veiculo),
        })

        if (!responseVeiculo.ok) {
            const errorData = await responseVeiculo.json()
            alert(`Error: ${errorData.error}`)
            console.error(`Erro: ${responseVeiculo.status} - ${responseVeiculo.statusText}`)
            return
        }

        renderVeiculos()
    } catch (error) {
        console.error("Erro ao processar as requisições:", error)
        alert("Erro ao deletar avaria.")
    }
}