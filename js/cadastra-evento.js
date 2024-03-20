$(document).ready(() => {
    $('#formEvento').submit(cadastrarEvento);
});

async function cadastrarEvento(event) {
    event.preventDefault();

    const formData = new FormData(this);

    const response = await fetch('http://localhost:3000/cadastro-evento', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    console.log(data);
    // Faça qualquer outra coisa que deseja fazer após o cadastro bem-sucedido

    history.pushState({}, '', window.location.href);
}
