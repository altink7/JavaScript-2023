function rechne(funktion) {
    var zahl1 = pruefeZahl(document.getElementById("zahl1").value, funktion);
    var zahl2 = pruefeZahl(document.getElementById("zahl2").value, funktion);
    if(funktion == "+"){    
        var ergebnis = Number(zahl1) + Number(zahl2);
    }else if(funktion == "-"){
        var ergebnis = Number(zahl1) - Number(zahl2);
    }else if(funktion == "*"){
        var ergebnis = Number(zahl1) * Number(zahl2);
    }else if(funktion == "/"){
        var ergebnis = Number(zahl1) / Number(zahl2);
    }
    document.getElementById("ergebnis").innerHTML = ergebnis;
    addToList(zahl1,zahl2,ergebnis,funktion);
  }

function pruefeZahl(zahl, funktion){
    if(isNaN(zahl)&& funktion != "/" && funktion != "*"){
        return 0;
    }else if(isNaN(zahl)){
        return 1;
    }
    return zahl;
}

function addToList(zahl1,zahl2,ergebnis, funktion){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(zahl1 + funktion + zahl2 + " = " + ergebnis));
    document.getElementById("ergebnisliste").appendChild(li);
}
