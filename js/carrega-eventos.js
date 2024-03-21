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

let contador = 0

$(document).ready(function () {
    carregaEventos()
})

function carregaEventos() {
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
                        endereco: eventData.endereco,
                        bairro: eventData.bairro,
                        descricao: eventData.descricao,
                        link: eventData.link,
                        hora: eventData.hora,
                        limite: eventData.limite,
                        local: eventData.local
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
                contador++
                const nomeEvento = eventData.nome_evento.length > 30 ? `${eventData.nome_evento.substring(0, 30)}...` : eventData.nome_evento

                const card = document.createElement('div');
                card.id = `card-${contador}`;
                card.className = 'card evento-card';

                // Adicionar conteúdo ao card
                card.innerHTML = `
                    <img src="${eventData.url}" alt="Foto do evento" class="img-card">
                    <h3 class="nome-card">${nomeEvento}</h3>
                    <p class="data-card">Data: ${eventData.data}</p>
                    <p class="endereco-card">Endereço: ${eventData.endereco}</p>
                    <p class="id-text">${eventData.id}</p>
                `;

                // Adicionar estilo para esconder o ID
                const style = document.createElement('style');
                style.textContent = `
                    #id-text {
                        display: none;
                    }
                `;
                document.head.appendChild(style);

                // Adicionar o card ao container
                eventosContainer.appendChild(card);

                card.addEventListener('click', (function (eventDataFechado) {
                    document.getElementById(`card-${contador}`).addEventListener('click', function () {
                        // Aqui você pode acessar as informações do evento clicado
                        const idEventoClicado = eventData.id
                        const nomeEventoClicado = eventData.nome_evento
                        const descricaoEventoClicado = eventData.descricao
                        const dataEventoClicado = eventData.data
                        const bairroEventoClicado = eventData.bairro
                        const linkEventoClicado = eventData.link
                        const enderecoEventoClicado = eventData.endereco
                        const urlEventoClicado = eventData.url
                        const horaEventoClicado = eventData.hora
                        const limiteEventoClicado = eventData.limite
                        const localEventoClicado = eventData.local

                        window.location.href = `evento.html?idEvento=${idEventoClicado}&nomeEvento=${nomeEventoClicado}&descricaoEvento=${descricaoEventoClicado}&dataEvento=${dataEventoClicado}&bairroEvento=${bairroEventoClicado}&linkEvento=${linkEventoClicado}&enderecoEvento=${enderecoEventoClicado}&horaEvento=${horaEventoClicado}&limiteEvento=${limiteEventoClicado}&localEvento=${localEventoClicado}` + '&urlEvento=' + urlEventoClicado

                        // Faça o que precisar com essas informações
                        console.log('ID do evento clicado:', idEventoClicado)
                        console.log('Nome do evento clicado:', nomeEventoClicado)
                        console.log('Data do evento clicado:', dataEventoClicado)
                        console.log('Endereço do evento clicado:', enderecoEventoClicado)
                        console.log('URL do evento clicado:', urlEventoClicado)
                    })
                })(eventData))
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