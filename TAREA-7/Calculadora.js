function agregarPantalla(value){
    document.getElementById("pantalla").value+=value;
}

function limpiarPantalla(){
    document.getElementById("pantalla").value = "";
}

function calcular(){
    try{
        let resul = eval(document.getElementById("pantalla").value);
        document.getElementById("pantalla").value = resul;
    }catch(error){
        document.getElementById("pantalla").value = "error"; 
    }
}