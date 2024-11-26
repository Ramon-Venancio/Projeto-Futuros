const form = document.getElementById("cadastrarVeiculoForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const veiculo = {
        modelo: document.getElementById("modelo").value,
        placa: document.getElementById("placa").value,
        ano: document.getElementById("ano").value,
        marca: document.getElementById("marca").value
    };

    try {
        // Recupera o token do localStorage
        const token = localStorage.getItem("authToken")
        console.log(token)

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
            alert("Erro ao cadastrar veículo. Verifique os dados.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar veículo:", error);
        alert("Erro ao conectar com o servidor.");
    }
});