let typingTimer;
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            message.style.display = 'block'
            message.innerHTML = 'Falha no login. Verifique suas credenciais.'
            message.style.color = 'red';
            return
        }

        const { token } = await response.json();
        if (password)
            localStorage.setItem('authToken', token); // Salva o token
        window.location.href = 'html/home.html'; // Redireciona para a página inicial
    } catch (error) {
        alert(error.message)
    }
})

document.getElementById('email').addEventListener('input', (e) => {
    e.preventDefault()
    clearTimeout(typingTimer)

    typingTimer = setTimeout(() => {
        console.log("entrou")

        const emailError = document.getElementById('emailError');
        if (emailError) {
            emailDiv.removeChild(emailError); // Remove o <span> usando o elemento pai
        }

        const emailRegex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
        const email = document.getElementById('email').value;

        if (emailRegex.test(email)) {
            const span = document.createElement('span');
            span.textContent = 'Digite um e-mail válido.';
            span.id = 'emailError'
            span.className = 'text-warning'; // Adiciona uma classe Bootstrap para estilização

            const emailDiv = document.getElementById('emailDiv');
            emailDiv.appendChild(span);
        }
    }, 1000);
})