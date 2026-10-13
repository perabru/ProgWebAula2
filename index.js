function somar(){

    let numero1 = document.getElementById("numero1").value;
    let numero2 = document.getElementById("numero2").value;

    let n1 = parseInt(numero1);
    let n2 = parseInt(numero2);
    
    let resultado = n1 + n2;

    alert("O resultado da soma é: " + resultado);

}



function enviarWhatsapp(){
    let numeroTelefone= "5512981418071";
    window.open("https://wa.me/" + numeroTelefone, "_blank");
}

function enviarSuporte(){
    let mensagem = document.getElementById("mensagem").value;
    let numeroTelefone = "5512981418071";
    window.open("https://wa.me/" + numeroTelefone + "?text=" 
        + encodeURIComponent(mensagem), "_blank");
}

function limpar(){
    document.getElementById("numero1").value = "";
    document.getElementById("numero2").value = "";

}