$(document).ready(function () {
    $('#logoff').on('click', realizarLogoff)
})

function realizarLogoff() {
    // Limpar o token de autenticação do localStorage
    localStorage.removeItem('userToken')

    // Redirecionar o usuário de volta para a página de login ou qualquer outra página apropriada
    window.location.href = "index.html"
}