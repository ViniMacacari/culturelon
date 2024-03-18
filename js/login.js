$(document).ready(function () {
    $('#formSignup').hide()
    $('#haveAccount').hide()
    $('#noAccount').click(function () {
        $('#formLogin').hide()
        $('#noAccount').hide()
        $('#formSignup').show()
        $('#haveAccount').show()
        $('#titleForm').text('Cadastrar')
    })

    $('#haveAccount').click(function () {
        $('#formLogin').show()
        $('#noAccount').show()
        $('#formSignup').hide()
        $('#haveAccount').hide()
        $('#titleForm').text('Entrar')
    })
})