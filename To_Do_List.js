var lista = [];

function adiciona(){
    var inputTexto = document.getElementById("NovoItem");
    var entradaTexto = inputTexto.value;

    if(entradaTexto == ""){alert("digite uma tarefa.")}
    else{

    var item = new Object();
    item.nome = entradaTexto;
    item.status = "não feito";
    
    lista.push(item);

    var listaJson = JSON.stringify(lista);
    localStorage.setItem("item",listaJson);

    document.getElementById("lista").innerHTML = "";
    inputTexto.value = "";

    imprime();

}
}

function imprime(){
    var ListaStorage = localStorage.getItem("item");
    var JsonListaStorage = JSON.parse(ListaStorage);
    
    for(i=0; i<JsonListaStorage.length; i++){
        var novaTag = document.createElement("div");
            var divTarefa = document.createElement("div");
            var liContent = document.createTextNode(JsonListaStorage[i].nome);
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
        
        divTarefa.setAttribute("class","tarefa"+i);

        divTarefa.appendChild(liContent);
        novaTag.appendChild(IconFeito);
        novaTag.appendChild(ButtonFeito);
        novaTag.appendChild(divTarefa);
        novaTag.appendChild(IconExclui); 
        novaTag.appendChild(ButtonExclui); 
        
        document.getElementById("lista").appendChild(novaTag);
        
        if(JsonListaStorage[i].status == "feito"){
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

    var listaJson = JSON.stringify(lista);
    localStorage.setItem("item",listaJson);

    document.getElementById("lista").innerHTML = "";

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
    var listaJson = JSON.stringify(lista);
    localStorage.setItem("item",listaJson);
    document.getElementById("lista").innerHTML = "";

    imprime(); 
}

document.getElementById("NovoItem")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("salvar").click();
    }
});