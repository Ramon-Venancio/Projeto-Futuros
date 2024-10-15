<template>
    <header> 
        <img :src="logo" alt="Logo da Empresa" id="imagem">
        <h1 class="Titulo">Gestao de veiculos</h1>
        <div class="Logout"> </div>
    </header>
</template>

<script>
export default{
    name: 'AppHeader',
    data(){
        return{
            logo: require('@/assets/logo.png')

        }
    }
}

</script>


<style scoped>

#titulo {
color: white;
font-family: Arial, Helvetica, sans-serif;
}

header{
margin: 0px 20%;
background-color: #007192;
padding: 1rem;
border-radius: 10px 10px 0 0;
box-shadow: 0px 5px 20px 5px rgba(0,0,0,0.2);
display: flex;
justify-content: center;
align-items: center; 
}

#imagem{
    width: 100px;
    height: 100px;
    display: block;
    margin-right: 30px;
    
}

.Titulo{
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>