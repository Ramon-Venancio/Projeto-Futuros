// Verifica se o usuário está logado
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '../index.html'
        return
    }
})
