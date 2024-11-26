document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Falha no login. Verifique suas credenciais.');
        }

        const { token } = await response.json();
        localStorage.setItem('authToken', token); // Salva o token
        window.location.href = 'html/home.html'; // Redireciona para a página inicial
    } catch (error) {
        errorMessage.textContent = error.message;
    }
})