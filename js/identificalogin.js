function verificarAutenticacao() {
    const userToken = localStorage.getItem('userToken')

    if (userToken) {
        // Se houver um token de usuário, o usuário está autenticado
        // Você pode usar este token para autenticar solicitações ao Firebase ou ao seu backend
        console.log("Usuário autenticado")
    } else {
        // Se não houver token de usuário, o usuário não está autenticado
        // Você pode redirecionar o usuário de volta para a página de login ou tomar outra ação apropriada
        console.log("Usuário não autenticado")
        window.location.href = "index.html?#"
    }
}

// Chame esta função em cada página onde você deseja verificar a autenticação do usuário
verificarAutenticacao()