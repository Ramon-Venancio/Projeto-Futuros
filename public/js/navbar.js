// Script para destacar a página ativa na navbar
document.addEventListener("DOMContentLoaded", () => {
    // Captura a URL atual
    const currentPage = window.location.pathname.split("/").pop();

    // Seleciona todos os links da navbar
    const navLinks = document.querySelectorAll(".nav-link");

    // Remove a classe 'active' de todos os links e aplica no atual
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});

document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault()

    localStorage.removeItem("authToken")
    window.location.href = '../index.html'
})
