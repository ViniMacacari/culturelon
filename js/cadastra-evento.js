import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js'
import { getDatabase, ref as databaseRef, set, push } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js'

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
const storage = getStorage(app)
const database = getDatabase(app)

const fileInput = $('input[type="file"]')

$(document).ready(function () {
    $('#cadEventBtn').click(function () {
        uploadFile()
        loading()
    })
    $('.loading').hide()
})

function uploadFile() {
    const file = fileInput.get(0).files[0]
    const ref = storageRef(storage, 'fotos/' + file.name)

    uploadBytes(ref, file).then((snapshot) => {
        console.log('Upload realizado com sucesso!')
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('Link para o arquivo:', downloadURL)
            const eventName = $('#nome').val()
            const eventDate = $('#data').val()
            const eventTime = $('#hora').val()
            const eventLocation = $('#local').val()
            const eventNbd = $('#bairro').val()
            const eventAddress = $('#rua').val() + ", " + $('#numero').val()
            const eventDescription = $('#descricao').val()
            const eventPeople = $('#limite').val()
            const eventMore = $('#link').val()
            uploadDatabase(eventName, downloadURL, eventDate, eventTime, eventLocation, eventNbd, eventAddress, eventDescription, eventPeople, eventMore)
        })
    }).catch((error) => {
        console.error('Erro ao fazer upload:', error)
    })
}

function uploadDatabase(eventName, imageUrl, eventDate, eventTime, eventLocation, eventNbd, eventAddress, eventDescription, eventPeople, eventMore) {
    const eventsRef = databaseRef(database, 'eventos')
    const newEventRef = push(eventsRef)

    set(newEventRef, {
        id: newEventRef.key,
        nome_evento: eventName,
        url: imageUrl,
        data: eventDate,
        hora: eventTime,
        local: eventLocation,
        bairro: eventNbd,
        endereco: eventAddress,
        descricao: eventDescription,
        limite: eventPeople,
        link: eventMore
    }).then(() => {
        console.log('Evento salvo no banco de dados com sucesso!')
        window.location.href = 'eventos.html'
    }).catch((error) => {
        console.error('Erro ao salvar evento:', error)
    })
}

function loading() {
    $('header').hide()
    $('main').hide()
    $('.loading').show()
    $('footer').hide()
}