$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search)

    // Extrair os valores individuais com base nos nomes dos parâmetros
    const idEvento = urlParams.get('idEvento')
    const nomeEvento = urlParams.get('nomeEvento')
    const descricaoEvento = urlParams.get('descricaoEvento')
    const dataEvento = urlParams.get('dataEvento')
    const bairroEvento = urlParams.get('bairroEvento')
    const linkEvento = urlParams.get('linkEvento')
    const enderecoEvento = urlParams.get('enderecoEvento')
    const horaEvento = urlParams.get('horaEvento')
    const limiteEvento = urlParams.get('limiteEvento')
    const localEvento = urlParams.get('localEvento')
    const urlEvento = urlParams.get('urlEvento')
    const tokenurlEvento = urlParams.get('token')

    // Agora você pode usar esses valores como desejar na página
    //console.log(idEvento, nomeEvento, descricaoEvento, dataEvento, bairroEvento, linkEvento, enderecoEvento, urlEvento, horaEvento, limiteEvento, localEvento)


    $('#tituloEvento').text(nomeEvento)
    $('#descricaoEvento').html(descricaoEvento.replace(/\.\s+/g, ".<br><br>"))
    $('#local').text(localEvento)
    $('#data').text(dataEvento)
    $('#saberMais').on('click', redEvent)
    $('#hora').text(horaEvento)
    $('#endereco').text(enderecoEvento)
    $('#limite').text(limiteEvento)
    $('#bairro').text(bairroEvento)
    // $('#img-evento').attr('src', urlEvento)

    function redEvent() {
        window.open(linkEvento + tokenurlEvento, '_blank')
    }
})