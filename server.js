const express = require('express')
const path = require('path')
const fs = require('fs')
const firebase = require('firebase/app')
const admin = require("firebase-admin")
const serviceAccount = require("./private/culturelon-firebase-adminsdk-ibas1-c861a1c282.json")
const multer = require('multer')
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

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(express.json())
app.use(express.static(path.join(__dirname)))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

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

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.')
    }

    const fileData = req.file.buffer
    const fileName = req.file.originalname

    // Referência para o armazenamento de arquivos no Firebase
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(fileName)

    // Fazendo o upload do arquivo
    fileRef.put(fileData).then(snapshot => {
        console.log('Arquivo enviado com sucesso para o Firebase.')
        // Retorna a URL do arquivo após o upload
        return fileRef.getDownloadURL()
    }).then(downloadURL => {
        res.status(200).send(downloadURL)
    }).catch(error => {
        console.error('Erro ao enviar arquivo para o Firebase:', error)
        res.status(500).send('Erro ao enviar arquivo para o Firebase.')
    })
})
