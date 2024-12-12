document.getElementById('registerForm').addEventListener('submit', async (event) => {
    console.log("entrou")
    event.preventDefault(); // Evita o recarregamento da página

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    usuario = {
        username: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password
    }
    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario),
        });

        if (response.ok) {
            alert('Usuário registrado com sucesso!');
            window.location.href = '../index.html';
        } else {
            const error = await response.json();
            alert(error.message || 'Erro ao registrar usuário');
        }
    } catch (err) {
        console.error(err);
        alert('Erro ao conectar ao servidor');
    }
});