import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
import { getDatabase, ref as databaseRef, get, child } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js'

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
const database = getDatabase(app)

$(document).ready(function () {
    carregaEventos()
})

async function carregaEventos() {
    const eventsRef = databaseRef(database, 'eventos')

    get(child(eventsRef, '/')).then((snapshot) => {
        if (snapshot.exists()) {
            const eventosContainer = document.getElementById('eventos-container')
            const eventos = []

            snapshot.forEach((childSnapshot) => {
                const eventData = childSnapshot.val()
                const dataEvento = eventData.data
                const hoje = new Date().toISOString().split('T')[0] // Data de hoje em formato "YYYY-MM-DD"

                // Verifica se o evento ocorre no futuro
                if (dataEvento >= hoje) {
                    eventos.push({
                        id: childSnapshot.key,
                        data: formatarData(dataEvento),
                        nome_evento: eventData.nome_evento,
                        url: eventData.url,
                        endereco: eventData.endereco
                    })
                }
            })

            // Ordena os eventos por data
            eventos.sort((a, b) => {
                const dataA = a.data.split('/').reverse().join('')
                const dataB = b.data.split('/').reverse().join('')
                return dataA.localeCompare(dataB)
            })

            // Renderiza os eventos
            eventos.forEach((eventData) => {
                const nomeEvento = eventData.nome_evento.length > 30 ? `${eventData.nome_evento.substring(0, 30)}...` : eventData.nome_evento
                const eventCard = `
                    <div class="card evento-card">
                        <img src="${eventData.url}" alt="Foto do evento" class="img-card">
                        <h3 class="nome-card">${nomeEvento}</h3>
                        <p class="data-card">Data: ${eventData.data}</p>
                        <p class="endereco-card">Endereço: ${eventData.endereco}</p>
                    </div>
                `
                eventosContainer.innerHTML += eventCard
            })
        } else {
            console.log('Nenhum dado disponível')
        }
    }).catch((error) => {
        console.error(error)
    })
}

function formatarData(data) {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
}