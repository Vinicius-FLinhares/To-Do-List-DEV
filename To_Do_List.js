var lista = [];

function adiciona(){
    var inputTexto = document.getElementById("NovoItem");
    var valorEntradaTexto = inputTexto.value;

    if(valorEntradaTexto == ""){alert("digite uma tarefa.")}
    else{

    var item = new Object();
    item.nome = valorEntradaTexto;
    item.status = "não feito";
    
    lista.push(item);
    
    inputTexto.value = "";
    
    PegaLista_AttStorage_Limpa();
    imprime();
}
}

function imprime(){
    var JsonListaStorage = localStorage.getItem("item");
    var ListaStorage = JSON.parse(JsonListaStorage);
    
    for(i=0; i<ListaStorage.length; i++){
        var novaTarefa = document.createElement("div");
            var divTextoTarefa = document.createElement("div");
            var textinho = document.createTextNode(ListaStorage[i].nome);
            var ButtonExclui = document.createElement("button");
            var ButtonFeito = document.createElement("button");
            var IconExclui = document.createElement("span");
            var IconFeito = document.createElement("span");

        ButtonExclui.setAttribute("id",i);
        ButtonExclui.setAttribute("onclick","excluiItem()");
        IconExclui.setAttribute("class","fa fa-trash");

        ButtonFeito.setAttribute("id",i);
        ButtonFeito.setAttribute("onclick","ItemFeito()");
        IconFeito.setAttribute("class","fa fa-check");
        
        divTextoTarefa.setAttribute("class","tarefa"+i);

        divTextoTarefa.appendChild(textinho);
        novaTarefa.appendChild(IconFeito);
        novaTarefa.appendChild(ButtonFeito);
        novaTarefa.appendChild(divTextoTarefa);
        novaTarefa.appendChild(IconExclui); 
        novaTarefa.appendChild(ButtonExclui); 
        
        document.getElementById("lista").appendChild(novaTarefa);
        
        if(ListaStorage[i].status == "feito"){
            var divEmQuestao = document.getElementsByClassName("tarefa"+i)[0];
            divEmQuestao.style.textDecoration = "line-through";
        }
    }
}

function carregando(){
    var ListaStorage = localStorage.getItem("item");
    var JsonListaStorage = JSON.parse(ListaStorage);
    for(i=0; i<JsonListaStorage.length; i++){
        lista[i] = JsonListaStorage[i];
    }
    imprime();
}
function excluiItem(){
    var confirmacao = window.confirm("Quer mesmo excluir esta tarefa?");
    if(confirmacao){
    var indice_id = event.srcElement.id;
    
    lista.splice(indice_id,1);

    PegaLista_AttStorage_Limpa();
    imprime();
    }
}
function ItemFeito(){
    var indice_id = event.srcElement.id;
    var estado = lista[indice_id].status;

    if(estado == "não feito"){
        lista[indice_id].status = "feito";
    }
    else{  
        lista[indice_id].status = "não feito";
    }
    PegaLista_AttStorage_Limpa();
    imprime(); 
}

function PegaLista_AttStorage_Limpa(){
    var listaJson = JSON.stringify(lista);
    localStorage.setItem("item",listaJson);
    document.getElementById("lista").innerHTML = "";
}

document.getElementById("NovoItem")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("salvar").click();
    }
});