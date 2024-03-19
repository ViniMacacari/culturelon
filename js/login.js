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

    $('#btnSignup').on('click', criaConta)
})

function criaConta() {
    console.log('teste')
    let emailS = $('#emailSignup').val()
    let passwordS = $('#passwordSignup').val()

    const data = {
        email: emailS,
        password: passwordS
    }
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('/signup', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(response)
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error('Erro ao criar conta:', error)
        })
}