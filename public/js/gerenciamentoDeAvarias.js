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
        if (veiculo.avarias) {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-header"><h4>${veiculo.modelo} - ${veiculo.placa}</h4></div>
                <div class="card-body">
                  <h5 class="card-title">Avarias:</h5>
                  <ul class="list-group mb-3">
                    ${veiculo.avarias.map((id) => `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${avarias[id - 1].localizacao}: ${avarias[id - 1].descricao} (${avarias[id - 1].data})
                          <div>
                            <button class="btn btn-sm btn-warning me-2" onclick="editAvaria(${index})">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteAvaria(${index}, ${id})">Deletar</button>
                          </div>
                        </li>
                    `).join('')}
                  </ul>
                  <button class="btn btn-secondary" onclick="addAvaria(${index})">Adicionar Avaria</button>
                  <button class="btn btn-primary" onclick="agendarManutencao(${index})">Agendar Manutenção</button>
                </div>
              `;
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
            localizacao: document.getElementById('localizacaoSelect').value.trim(),
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

// Agendar manutenção
async function agendarManutencao(veiculoIndex) {
    const veiculo = veiculos[veiculoIndex];
    const response = await fetch(`http://localhost:3000/api/manutencoes/${veiculo.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: new Date().toISOString().split('T')[0] })
    });

    if (response.ok) {
        alert(`Manutenção agendada para o veículo ${veiculo.modelo} (${veiculo.placa})`);
    } else {
        alert('Erro ao agendar manutenção.');
    }
}

// Editar avaria existente
function editAvaria(veiculoIndex, avariaIndex) {
    const veiculo = veiculos[veiculoIndex];
    const avaria = veiculo.avarias[avariaIndex - 1];
    document.getElementById('veiculoPlaca').value = veiculo.placa;
    document.getElementById('descricaoAvaria').value = avaria.descricao;
    document.getElementById('dataAvaria').value = avaria.data;
    const modal = new bootstrap.Modal(document.getElementById('avariaModal'));
    modal.show();
    document.getElementById('avariaForm').onsubmit = async (e) => {
        e.preventDefault();
        avaria.descricao = document.getElementById('descricaoAvaria').value;
        avaria.data = document.getElementById('dataAvaria').value;

        // Simular requisição ao back-end para atualizar avaria
        await fetch(`http://localhost:3000/api/avarias/${veiculo.id}/${avariaIndex}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(avaria)
        });

        modal.hide();
        renderVeiculos();
    };
}

// Deletar avaria
async function deleteAvaria(veiculoIndex, avariaID) {
    const veiculo = veiculos[veiculoIndex]
    veiculo.avarias.splice(avariaID - 1, 1)

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

    renderVeiculos();
}