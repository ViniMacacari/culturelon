import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getDatabase, ref, onDisconnect, push, set, onValue, serverTimestamp, get } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyB4P6Bk7MKbcG_3GIEI4Wlsg1_VRZtlL5E",
    authDomain: "culturelon.firebaseapp.com",
    projectId: "culturelon",
    storageBucket: "culturelon.appspot.com",
    messagingSenderId: "422065232759",
    appId: "1:422065232759:web:e8158ba99e6edea25f9f72",
    measurementId: "G-YHGVFVR8CY"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

auth.onAuthStateChanged(user => {
    if (user) {
        const currentUserUid = user.uid;
        const myConnectionsRef = ref(database, 'users/' + currentUserUid + '/connections');
        const lastOnlineRef = ref(database, 'users/' + currentUserUid + '/lastOnline');
        const connectedRef = ref(database, '.info/connected');

        onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                const con = push(myConnectionsRef);
                onDisconnect(con).remove();
                onDisconnect(lastOnlineRef).set(serverTimestamp());

                set(con, true);
            }
        });

        const activeUsersRef = ref(database, 'users/active');
        onValue(activeUsersRef, (snapshot) => {
            get(snapshot.ref).then(snap => {
                const activeUsers = snap.size; // Usando .size para coleções
                console.log(`Existem ${activeUsers} usuários ativos.`);
                document.getElementById('contador').textContent = activeUsers;
            }).catch(error => {
                console.error("Erro ao obter dados:", error);
            });
        });
    } else {
        console.log('Usuário não autenticado');
    }
});
