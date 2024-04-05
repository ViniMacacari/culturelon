$(document).ready(function () {
    $(".btn-cadastrar").click(function () {
        window.location.href = "/cadevento.html";
    })

    var menu = 'open'
    $('#ham-menu').on('click', function () {
        if (menu == 'open') { // aberto
            menu = 'close'
            document.querySelector('header').classList.remove('ret')
            document.querySelector('header').classList.add('exp')
            document.querySelector('body').classList.add('exp')
        } else { // fechado
            menu = 'open'
            document.querySelector('header').classList.add('ret')
            document.querySelector('header').classList.remove('exp')
            document.querySelector('body').classList.remove('exp')
            setTimeout(function () {
                $('h1').show()
            }, 500)
        }
        $('#ham-menu').toggleClass('fa-bars fa-xmark')
        $('h1').hide()
    })
})