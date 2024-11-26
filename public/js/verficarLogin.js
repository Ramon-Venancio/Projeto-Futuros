// Verifica se o usuário está logado
function verificarLogin() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '../index.html'
        return
    }
}

verificarLogin()