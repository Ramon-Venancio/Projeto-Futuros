let usuarios = '';
const token = localStorage.getItem("authToken")

// Carregar os dados quando a página é carregada
window.onload = function () {
    carregarUsuarios();
    toggleTable('funcionarios');  // Exibe os funcionários por padrão
};

// Função para carregar os dados do arquivo usuarios.json
async function carregarUsuarios() {
    const response = await fetch('http://localhost:3000/api/usuarios', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    usuarios = await response.json()

    exibirUsuarios()
}

// Função para exibir os usuários nas tabelas de funcionários e administradores
function exibirUsuarios() {
    const funcionariosTableBody = document.getElementById('funcionarioCorpoTabela');
    const administradoresTableBody = document.getElementById('administradoresCorpoTabela');

    // Limpa as tabelas antes de adicionar os dados
    funcionariosTableBody.innerHTML = '';
    administradoresTableBody.innerHTML = '';

    // Filtra os usuários com base no role
    const funcionarios = usuarios.filter(user => user.role === 'funcionario');
    const administradores = usuarios.filter(user => user.role === 'admin');

    // Preencher a tabela de funcionários
    funcionarios.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editFuncionarioModal" onclick="editUsuario(${user.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUsuario(${user.id})">Excluir</button>
            </td>
        `;
        funcionariosTableBody.appendChild(row);
    })

    // Preencher a tabela de administradores
    administradores.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editFuncionarioModal" onclick="editUsuario(${user.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUsuario(${user.id})">Excluir</button>
            </td>
        `;
        administradoresTableBody.appendChild(row);
    });
}

// Alterna entre as tabelas de funcionários e administradores
function toggleTable(userType) {
    const funcionariosTable = document.getElementById('funcionarios');
    const administradoresTable = document.getElementById('administradores');

    if (userType === 'funcionarios') {
        funcionariosTable.style.display = 'block';
        administradoresTable.style.display = 'none';
    } else if (userType === 'administradores') {
        funcionariosTable.style.display = 'none';
        administradoresTable.style.display = 'block';
    }
}

// Função para adicionar um novo funcionário
function addFuncionario() {
    const modalElement = document.getElementById('usuarioModal');
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();

    document.getElementById('tituloModal').innerHTML = 'Adicionar novo funcionario';
    document.getElementById('labelSenha').innerHTML = 'Senha'

    document.getElementById('usuarioForm').onsubmit = async (event) => {
        event.preventDefault();
        const newPassword = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value

        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        const novoFuncionario = {
            username: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: newPassword,
        };

        try {
            const response = await fetch(`http://localhost:3000/api/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(novoFuncionario),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.error}`);
                return;
            }

            modalInstance.hide();
            setTimeout(() => {
                alert('Funcionario adicionado com sucesso!');
                console.log('Fucionario adicionando')
                document.getElementById('usuarioForm').reset()
                carregarUsuarios();
            }, 100)

        } catch (err) {
            console.error(err);
            alert('Erro ao conectar ao servidor');
        }
    }
}

function addAdmin() {
    const modalElement = document.getElementById('usuarioModal');
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();

    document.getElementById('tituloModal').innerHTML = 'Adicionar novo admin';
    document.getElementById('labelSenha').innerHTML = 'Senha'

    document.getElementById('usuarioForm').onsubmit = async (event) => {
        event.preventDefault();
        const newPassword = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value

        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        const novoAdmin = {
            username: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: newPassword,
        };

        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(novoAdmin),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.error}`);
                return;
            }

            modalInstance.hide();
            setTimeout(() => {
                alert('Administrador adicionado com sucesso!');
                console.log('Administrador adicionando')
                document.getElementById('usuarioForm').reset()
                carregarUsuarios();
            }, 100)

        } catch (err) {
            console.error(err);
            alert('Erro ao conectar ao servidor');
        }
    }
}

// Função para editar um usuário
function editUsuario(userId) {
    const usuario = usuarios.find(user => user.id === userId); // Encontre o usuário pelo ID
    document.getElementById('name').value = usuario.username;
    document.getElementById('email').value = usuario.email;

    const modalElement = document.getElementById('usuarioModal');
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();

    document.getElementById('tituloModal').innerHTML = `Editar ${usuario.role}`;
    document.getElementById('labelSenha').innerHTML = 'Alterar senha'

    document.getElementById('usuarioForm').onsubmit = async (event) => {
        event.preventDefault();
        let updatedUsuario = ''
        console.log("entrou")


        const newPassword = document.getElementById('password').value;
        if (newPassword) {
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            updatedUsuario = {
                username: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: newPassword,
            };
        } else {
            updatedUsuario = {
                username: document.getElementById('name').value,
                email: document.getElementById('email').value,
            };
        }

        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUsuario),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.error}`);
                return;
            }

            modalInstance.hide();
            setTimeout(() => {
                alert('Usuário atualizado com sucesso!');
                console.log('Usuário atualizado')
                carregarUsuarios();
            }, 100)


        } catch (err) {
            console.error(err);
            alert('Erro ao conectar ao servidor');
        }
    };
}

// Função para excluir um funcionário
async function deleteUsuario(idUsuario) {
    const response = await fetch(`http://localhost:3000/api/usuarios/${idUsuario}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    if (!response.ok) {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
        console.error(`Erro: ${response.status} - ${response.statusText}`)
        return
    }
    carregarUsuarios();
}