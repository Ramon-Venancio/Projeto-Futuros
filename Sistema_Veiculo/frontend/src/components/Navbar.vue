<template>
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Cadastro de Veiculos</a></li>
            <li><a href="#">Avarias de Veiculos</a></li>
            <li><a href="#">Lista de avarias</a></li>
            <li><a href="#">Lista de Veiculos</a></li>
        </ul>
    </nav>
</template>

<script>
export default{
    name: 'AppNavbar',
}
</script>


<style scoped>
nav{
    margin: 0 20%;
    padding: 8px;
    background-color: #1683a5;
    border-radius: 0 0 10px 10px;
}
nav li{
    text-align: center;
    flex: 1;
}

nav ul{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    
    
}

nav a{
color: white;
font-size: 20px;
text-decoration: none;
padding: 8px 0;
display: block;
border-radius: 25px;
}

nav a:hover{
    background-color: #2c95b7;
}
</style>