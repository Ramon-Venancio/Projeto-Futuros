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
        console.log(user)
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editFuncionarioModal" onclick="editUsuario(${user.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteFuncionario(${user.id})">Excluir</button>
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
                <button class="btn btn-danger btn-sm" onclick="deleteAdmin(${user.id})">Excluir</button>
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
    const nome = document.getElementById('nomeFuncionario').value;
    const email = document.getElementById('emailFuncionario').value;
    const cargo = document.getElementById('cargoFuncionario').value;

    // Gerar um novo ID para o funcionário
    const novoFuncionario = {
        id: usuarios.length + 1,
        username: nome,
        email: email,
        role: 'funcionario',
    };

    // Adiciona o novo usuário ao array de usuários
    usuarios.push(novoFuncionario);

    // Atualiza as tabelas após adicionar o novo funcionário
    exibirUsuarios();

    // Fecha o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addFuncionarioModal'));
    modal.hide();
    limparFormulario();
}

// Função para adicionar um novo administrador
function addAdmin() {
    const nome = document.getElementById('nomeAdmin').value;
    const email = document.getElementById('emailAdmin').value;
    const cargo = document.getElementById('cargoAdmin').value;

    // Gerar um novo ID para o administrador
    const novoAdmin = {
        id: usuarios.length + 1,
        username: nome,
        email: email,
        role: 'admin',
    };

    // Adiciona o novo usuário ao array de usuários
    usuarios.push(novoAdmin);

    // Atualiza as tabelas após adicionar o novo administrador
    exibirUsuarios();

    // Fecha o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addAdminModal'));
    modal.hide();
    limparFormulario();
}

// Função para editar um funcionário
// Função para editar um usuário
function editUsuario(userId) {
    const usuario = usuarios.find(user => user.id === userId); // Encontre o usuário pelo ID
    console.log(usuario);
    document.getElementById('name').value = usuario.username;
    document.getElementById('email').value = usuario.email;

    const modalElement = document.getElementById('usuarioModal');
    const modalInstance = new bootstrap.Modal(modalElement);    
    modalInstance.show();

    document.getElementById('tituloModal').innerHTML = `Editar ${usuario.role}`;
    document.getElementById('usuarioForm').onsubmit = async (event) => {
        event.preventDefault();

        const newPassword = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        const updatedUsuario = {
            username: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: newPassword,
        };

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

            alert('Usuário atualizado com sucesso!');
            carregarUsuarios();

        } catch (err) {
            console.error(err);
            alert('Erro ao conectar ao servidor');
        }
    };
}

// Função para salvar as edições do funcionário
function saveFuncionario() {
    const id = document.getElementById('editFuncionarioId').value;
    const nome = document.getElementById('editNomeFuncionario').value;
    const email = document.getElementById('editEmailFuncionario').value;
    const cargo = document.getElementById('editCargoFuncionario').value;

    // Atualiza o funcionário no array
    const funcionario = usuarios.find(user => user.id === parseInt(id));
    if (funcionario) {
        funcionario.username = nome;
        funcionario.email = email;
        funcionario.role = cargo; // Você pode querer mudar para um cargo específico de "funcionario"
    }

    // Atualiza as tabelas
    exibirUsuarios();

    // Fecha o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editFuncionarioModal'));
    modal.hide();
}

// Função para excluir um funcionário
function deleteFuncionario(id) {
    usuarios = usuarios.filter(user => user.id !== id);
    exibirUsuarios();
}

// Função para salvar as edições do administrador
function saveAdmin() {
    const id = document.getElementById('editAdminId').value;
    const nome = document.getElementById('editNomeAdmin').value;
    const email = document.getElementById('editEmailAdmin').value;
    const cargo = document.getElementById('editCargoAdmin').value;

    // Atualiza o administrador no array
    const admin = usuarios.find(user => user.id === parseInt(id));
    if (admin) {
        admin.username = nome;
        admin.email = email;
        admin.role = cargo;
    }

    // Atualiza as tabelas
    exibirUsuarios();

    // Fecha o modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editAdminModal'));
    modal.hide();
}

// Função para excluir um administrador
function deleteAdmin(id) {
    usuarios = usuarios.filter(user => user.id !== id);
    exibirUsuarios();
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById('nomeFuncionario').value = '';
    document.getElementById('emailFuncionario').value = '';
    document.getElementById('cargoFuncionario').value = '';
    document.getElementById('nomeAdmin').value = '';
    document.getElementById('emailAdmin').value = '';
    document.getElementById('cargoAdmin').value = '';
}