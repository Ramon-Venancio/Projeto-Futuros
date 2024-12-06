let veiculos = ''
const form = document.getElementById('adicionarAvariaForm')
const searchInput = document.getElementById('searchInput')
const token = localStorage.getItem("authToken")

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/api/veiculos', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    if (response.ok) {
        veiculos = await response.json()
    } else {
        console.error(`Erro: ${response.status} - ${response.statusText}`)
    }
})

searchInput.addEventListener('input', async () => {
    const searchInput = document.getElementById('searchInput')
    const searchResults = document.getElementById('searchResults')
    const query = searchInput.value.toLowerCase()
    searchResults.innerHTML = ''

    const placas = veiculos.map(veiculo => {
        return veiculo.placa
    })

    if (query) {
        const filteredPlacas = placas.filter(placa =>
            placa.toLowerCase().includes(query)
        )
        if (filteredPlacas.length > 0) {
            searchResults.classList.remove('d-none');
            filteredPlacas.forEach(item => {
                const resultItem = document.createElement('button');
                resultItem.className = 'list-group-item list-group-item-action';
                resultItem.textContent = `${item}`;
                resultItem.type = 'button';
                resultItem.addEventListener('click', () => {
                    searchInput.value = item; // Preenche o campo com a placa selecionada
                    searchResults.classList.add('d-none'); // Oculta os resultados
                });
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.classList.add('d-none');
        }
    } else {
        searchResults.classList.add('d-none');
    }
});
// Ocultar os resultados se o campo perder o foco
searchInput.addEventListener('blur', () => {
    setTimeout(() => searchResults.classList.add('d-none'), 200); // Adiciona um pequeno atraso para capturar cliques
});
// Mostrar os resultados novamente ao focar no campo
searchInput.addEventListener('focus', () => {
    if (searchInput.value && searchResults.childElementCount > 0) {
        searchResults.classList.remove('d-none');
    }
});

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

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Obter os valores do formulário
    let avaria = {
        placa: document.getElementById('searchInput').value.trim(),
        localizacao: document.getElementById('localizacaoSelect').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        data: document.getElementById('data').value.trim(),
    }

    // Validação básica
    if (!avaria.placa || !avaria.localizacao || !avaria.descricao || !avaria.data) {
        alert("Por favor, preencha todos os campos.")
        return
    }

    const carro = veiculos.find(veiculo => veiculo.placa.toLowerCase() === avaria.placa.toLowerCase())

    if (!carro) {
        alert("Veículo não encontrado.")
        return
    }

    avaria = {idVeiculo: carro.id, ...avaria}

    try {
        // Enviar avaria ao servidor
        const responseAvaria = await fetch(`http://localhost:3000/api/avarias/${carro.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(avaria),
        })

        if (!responseAvaria.ok) {
            const errorData = await responseAvaria.json()
            alert(`Error: ${errorData.error}`)
            console.error(`Erro: ${responseAvaria.status} - ${responseAvaria.statusText}`)
            return
        }

        // Atualizar veículo com a data de manutenção
        const avariaCriada = await responseAvaria.json()

        if (!carro.avarias) {
            carro.avarias = []
            carro.avarias.push(avariaCriada.id)
        } else {
            carro.avarias.push(avariaCriada.id)
        }

        const responseVeiculo = await fetch(`http://localhost:3000/api/veiculos/${carro.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(carro),
        })

        if (!responseVeiculo.ok) {
            const errorData = await responseVeiculo.json()
            alert(`Error: ${errorData.error}`)
            console.error(`Erro: ${responseVeiculo.status} - ${responseVeiculo.statusText}`)
            return
        }

        alert("Avaria adicionada com sucesso!")
        console.log("Avaria e veículo atualizados.")
        form.reset()
    } catch (error) {
        console.error("Erro ao processar as requisições:", error)
        alert("Erro ao adicionar avaria.")
    }
})