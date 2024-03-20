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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // O diretório onde os arquivos serão salvos temporariamente
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // Nome do arquivo com timestamp para evitar conflitos
    }
})

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

app.post('/cadastro-evento', upload.single('foto'), (req, res) => {
    console.log("entrou")

    const { nome, data, hora, local, bairro, rua, numero, descricao, limite, link } = req.body
    const fotoPath = req.file.path // Caminho para o arquivo de imagem temporário

    // Salvar dados do evento no banco de dados (substitua este comentário pelo seu código de salvamento)

    // Publicar dados do evento no Realtime Database
    const database = admin.database()

    const evento = {
        nome,
        data,
        hora,
        local,
        bairro,
        rua,
        numero,
        descricao,
        limite,
        link,
        fotoPath,
    }

    database.ref('eventos').push(evento)

    res.status(201).json({ message: 'Evento cadastrado com sucesso!' })
})
