import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
import { getDatabase, ref, onValue, runTransaction } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js'

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

const visitsRef = ref(database, 'visits')

// Incrementa o contador quando a página carrega
runTransaction(visitsRef, currentVisits => {
    return (currentVisits || 0) + 1
})

// Atualiza o número de visitas em tempo real
onValue(visitsRef, snapshot => {
    const visits = snapshot.val()
    document.getElementById('contador').textContent = visits
})
