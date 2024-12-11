const form = document.getElementById("cadastrarVeiculoForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const veiculo = {
        ano: document.getElementById("ano").value,
        modelo: document.getElementById("modelo").value,
        marca: document.getElementById("marca").value,
        placa: document.getElementById("placa").value,
    };

    try {
        // Recupera o token do localStorage
        const token = localStorage.getItem("authToken")

        const response = await fetch("http://localhost:3000/api/veiculos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Adiciona o token ao cabeçalho Authorization
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(veiculo),
        });

        if (response.ok) {
            alert("Veículo cadastrado com sucesso!");
            form.reset();
        } else {
            const errorData = await response.json()
            alert(`Erro: ${errorData.error}`)
        }
    } catch (error) {
        console.error("Erro ao cadastrar veículo:", error);
        alert("Erro ao conectar com o servidor.");
    }
});