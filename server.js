const express = require('express')
const path = require('path')
const fs = require('fs')
const firebase = require('firebase/app')
const admin = require("firebase-admin")
const serviceAccount = require("./private/culturelon-firebase-adminsdk-ibas1-c861a1c282.json")
require('firebase/auth')

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB4P6Bk7MKbcG_3GIEI4Wlsg1_VRZtlL5E",
    authDomain: "culturelon.firebaseapp.com",
    projectId: "culturelon",
    storageBucket: "culturelon.appspot.com",
    messagingSenderId: "422065232759",
    appId: "1:422065232759:web:e8158ba99e6edea25f9f72",
    measurementId: "G-YHGVFVR8CY"
}

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig)

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.static(path.join(__dirname)))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

// Seu middleware e rotas do Express vêm aqui

app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`)
})

app.post('/signup', async (req, res) => { // Criar conta
    const { email, password } = req.body

    try {
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
        })

        return res.status(200).json({ message: 'Conta criada com sucesso!', uid: userRecord.uid })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

app.post('/login', async (req, res) => { // Login
    const { email, password } = req.body;

    try {
        // O usuário faz login no lado do cliente e obtém um token de ID
        const token = req.body.idToken;

        // Verifica o token de ID no servidor
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        // Retorna uma resposta de sucesso com o UID do usuário
        return res.status(200).json({ message: 'Login realizado com sucesso!', uid: uid });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})