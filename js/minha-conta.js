import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
import { getAuth, updatePassword } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'

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
const auth = getAuth(app)

$(document).ready(function () {
    $('#btnSave').on('click', atualizarSenha)
})

function atualizarSenha() {
    if (($('#newPassword').val() != '' && $('#confirmPassword').val() != '') && ($('#newPassword').val() == $('#confirmPassword').val())) {
        const newPassword = $('#newPassword').val()

        const user = auth.currentUser

        updatePassword(user, newPassword)
            .then(() => {
                console.log("Senha alterada com sucesso!")
            })
            .catch((error) => {
                alert("Logue novamente para alterar a senha:", error)
                realizarLogoff()
                function realizarLogoff() {
                    localStorage.removeItem('userToken')
                    window.location.href = "index.html"
                }
            })
    } else {
        alert("As senhas devem ser iguais e não podem ser vazias!")
    }
}