var gustosList = [];
var gustoEditado; 
var rowEditado;

class Gusto {
    id;
    nombre;
    porcentaje;
    constructor(id, nombre, porcentaje){
        this.id = id;
        this.nombre = nombre;
        this.porcentaje = porcentaje;
    }
};

function agregarGusto() {
    let gustoName = document.querySelector("#gustos").value;
    // revisar que no exista ya en la lista
    let id = gustoName;
    repetido = gustosList.filter(gusto => gusto.nombre === gustoName);
    if(repetido.length > 0){
        id += repetido.length;
    }
    let newGusto = new Gusto(id, gustoName, 0);
    gustosList.push(newGusto);
    reloadTable();
    document.querySelector("#gustos").value = "";
}


function reloadTable(){
    let tbody = document.querySelector("tbody");
    let content = 
    `  <tr class="gustos_table_header">
    <th class="nombre_gusto">Gusto</th>
    <th class="porcentaje_gusto">%</th>
    <th class="editar_gusto">edit</th>
    </tr>`
    gustosList.forEach(gusto => {
        content += `<tr class="gusto_table_row disabled" data-gusto="${gusto.id}">
        <td class="nombre_gusto "><input disabled type="text"></td>
        <td class="porcentaje_gusto"><input disabled type="text"></td>
        <td class="editar_gusto"><a data-gusto="${gusto.id}" class="editar_row" onclick="editarRow(event)">Editar</a></td>
        </tr>`;
    });
    tbody.innerHTML = content;
    gustosList.forEach(gusto => {
        document.querySelector(`[data-gusto="${gusto.id}"] .nombre_gusto input`).value = gusto.nombre;   
        document.querySelector(`[data-gusto="${gusto.id}"] .porcentaje_gusto input`).value = gusto.porcentaje;
    });

}

function editarRow(event){
    if(document.querySelector(".button_container").classList.contains("hidden")){
        document.querySelector(".button_container").classList.remove("hidden"); 
        event.target.innerHTML = "En edicion";
        event.target.classList.add("enEdicion");
        let nombreGusto =  event.target.getAttribute("data-gusto");
        let row = document.querySelector(`.gusto_table_row[data-gusto="${nombreGusto}"]`);
        row.classList.remove("disabled");
        row.querySelector(".nombre_gusto input").disabled = false;
        row.querySelector(".porcentaje_gusto input").disabled = false;
        rowEditado = row;
    }
    else{
        alert("Una fila ya se encuentra en edición. Recargue la pagina para editar otra fila");
    }

}

function guardarCambios(){
    rowEditado.classList.add("disabled")
    let nombreField = rowEditado.querySelector(".nombre_gusto input");
    let porcentajeField = rowEditado.querySelector(".porcentaje_gusto input");
    nombreField.disabled = true;
    porcentajeField.disabled = true;
    gustoEditado = new Gusto(nombreField.value, nombreField.value, porcentajeField.value)
    gustosList.push(gustoEditado);
    reloadTable();
}

function cancelCambios(){
    reloadTable();
    document.querySelector(".button_container").classList.add("hidden"); 
}

function submitForm(e){    
    e.preventDefault();
    guardarCambios();
    console.log(gustoEditado);

    let frm = document.querySelector("form");
    $.ajax({
        type: "get",
        url: `finish.html?nombre=${frm.querySelector("#nombre").value}&email=${frm.querySelector("#email").value}&telefono=${frm.querySelector("#telefono").value}&gustos=${gustoEditado.nombre}&porc=${gustoEditado.porcentaje}`,
        data: {
            "nombre": frm.querySelector("#nombre").value,
            "email": frm.querySelector("#email").value,
            "telefono": frm.querySelector("#telefono").value,
            "gustos": gustoEditado.nombre,
            "porc": gustoEditado.porcentaje,

        },
        success: function (data) {
            window.open(`finish.html?nombre=${frm.querySelector("#nombre").value}&email=${frm.querySelector("#email").value}&telefono=${frm.querySelector("#telefono").value}&gustos=${gustoEditado.nombre}&porc=${gustoEditado.porcentaje}`);

        },
        error: function (data) {
        },
    });


}





