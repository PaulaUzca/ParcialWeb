window.onload = function() {
    showCard();
}

function showCard(){
    let nombre = getParam("nombre")
    let email = getParam("email");
    let telefono = getParam("telefono");
    let gusto = getParam("gustos");
    let porcentaje = getParam("porc");

    //document.querySelector(".form_container").classList.add("hidden");
    document.querySelector("main").innerHTML = `
    <div class="card_container">
    <p>Resultado</p>
    <div class="card">
        <div class="card_header">
            <span id="smile" class="material-symbols-outlined">
                sentiment_satisfied
            </span>
            <p>${nombre}</p>
        </div>
        <div class="card_content">
            <div class="card_row">
                <span class="row_title">Email</span><span class="row_content email_e">${email}</span>
            </div>
            <div class="card_row">
                <span class="row_title">Teléfono</span><span class="row_content phone_e">${telefono}</span>
            </div>
            <div class="card_row">
                <span class="row_title">Gusto</span><span class="row_content gusto_e">${gusto}</span>
            </div>
            <div class="card_row">
                <span class="row_title">Porcentaje</span><span class="row_content porcentaje_e">${porcentaje}</span>
            </div>
        </div>
    </div>
</div>
`
}


function getParam(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return decodeURIComponent(sParameterName[1]);
        }
    }
    }