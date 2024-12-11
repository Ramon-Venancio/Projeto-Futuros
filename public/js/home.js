let veiculos = ''

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/veiculos', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            console.error(`Erro: ${response.status} - ${response.statusText}`);
            return
        }

        veiculos = await response.json()
    } catch (error) {
        console.error("Erro ao carregar veículos:", error)
    }
})

function preencherCards () {
    const pManutencoes = document.getElementById('manutencoesPCard')
    const pAvarias = document.getElementById('avariasPCard')
}

function preencherTabela () {

}