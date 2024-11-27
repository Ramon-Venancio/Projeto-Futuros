const token = localStorage.getItem("authToken")
const veiculos = await fetch('http://localhost:3000/api/usuarios/login', {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }
})  

searchInput.addEventListener('input', async () => {
    const searchInput = document.getElementById('searchInput')
    const searchResults = document.getElementById('searchResults')
    const query = searchInput.value.toLowerCase()
    searchResults.innerHTML = ''


    if (query) {
        const filteredPlacas = placas.filter(placa =>
            placa.placa.toLowerCase().includes(query) || placa.nome.toLowerCase().includes(query)
        );

        if (filteredPlacas.length > 0) {
            searchResults.classList.remove('d-none');
            filteredPlacas.forEach(item => {
                const resultItem = document.createElement('button');
                resultItem.className = 'list-group-item list-group-item-action';
                resultItem.textContent = `${item.placa} (${item.nome})`;
                resultItem.type = 'button';
                resultItem.addEventListener('click', () => {
                    searchInput.value = item.placa; // Preenche o campo com a placa selecionada
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