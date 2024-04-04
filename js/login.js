import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyB4P6Bk7MKbcG_3GIEI4Wlsg1_VRZtlL5E",
    authDomain: "culturelon.firebaseapp.com",
    projectId: "culturelon",
    storageBucket: "culturelon.appspot.com",
    messagingSenderId: "422065232759",
    appId: "1:422065232759:web:e8158ba99e6edea25f9f72",
    measurementId: "G-YHGVFVR8CY"
}

const app = initializeApp(firebaseConfig)
const authFire = getAuth(app)

$(document).ready(function () {
    $('#formSignup').hide()
    $('#haveAccount').hide()
    $('#noAccount').click(function () {
        $('#formLogin').hide()
        $('#noAccount').hide()
        $('#formSignup').show()
        $('#haveAccount').show()
        $('#forgot').hide()
        $('#titleForm').text('Cadastrar')
    })

    $('#haveAccount').click(function () {
        $('#formLogin').show()
        $('#noAccount').show()
        $('#formSignup').hide()
        $('#haveAccount').hide()
        $('#forgot').show()
        $('#titleForm').text('Entrar')
    })

    $('#btnSignup').on('click', criaConta)
    $('#btnLogin').on('click', entrarConta)
    $('#forgot').on('click', esqueciSenha)

    verificarAutenticacao()

    if (window.location.href.indexOf('?#') === -1) {
        window.location.href += '?#'
    }

    $('#withouLogin').on('click', function () {
        window.location.href = "eventos.html"
    })
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
            $('#formLogin').show()
            $('#noAccount').show()
            $('#formSignup').hide()
            $('#haveAccount').hide()
            $('#forgot').show()
            $('#titleForm').text('Entrar')
            $('#formSignup')[0].reset()
        })
        .catch(error => {
            alert('Erro ao criar conta:', error)
        })
}

function entrarConta() {
    let emailL = $('#emailLogin').val()
    let passwordL = $('#passwordLogin').val()

    signInWithEmailAndPassword(authFire, emailL, passwordL)
        .then((userCredential) => {
            const user = userCredential.user
            user.getIdToken().then((idToken) => {
                // Armazene o token de autenticação onde for necessário, como localStorage
                localStorage.setItem('userToken', idToken)

                // Redirecionar para a página de eventos
                window.location.href = "eventos.html"
            }).catch((error) => {
                console.error('Erro ao obter token de autenticação:', error)
            })
        })
        .catch((error) => {
            // Tratar erros de login
            alert("Erro no login: " + error.message)
        })
}

function verificarAutenticacao() {
    const userToken = localStorage.getItem('userToken')

    if (userToken) {
        console.log("Usuário autenticado")
        window.location.href = "eventos.html"
    } else {
        console.log("Usuário não autenticado")
    }
}

function esqueciSenha() {
    const email = $('#emailLogin').val()

    sendPasswordResetEmail(authFire, email)
        .then(() => {
            alert("Email enviado com sucesso!")
        })
        .catch((error) => {
            console.error("Erro ao enviar email:", error)
        })
}