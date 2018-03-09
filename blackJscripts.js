/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*var cartas = ['A', 'A', 'A', 'A', '2', '2', '2', '2', '3', '3', '3', '3', '4', '4', '4', '4',
    '5', '5', '5', '5', '6', '6', '6', '6', '7', '7', '7', '7', '8', '8', '8', '8',
    '9', '9', '9', '9', '10', '10', '10', '10', 'J', 'J', 'J', 'J', 'Q', 'Q', 'Q', 'Q',
    'K', 'K', 'K', 'K'];*/
var cartas = ['ace_of_clubs', 'ace_of_diamonds', 'ace_of_hearts', 'ace_of_spades2',
    '2_of_clubs', '2_of_diamonds', '2_of_hearts', '2_of_spades',
    '3_of_clubs', '3_of_diamonds', '3_of_hearts', '3_of_spades',
    '4_of_clubs', '4_of_diamonds', '4_of_hearts', '4_of_spades',
    '5_of_clubs', '5_of_diamonds', '5_of_hearts', '5_of_spades',
    '6_of_clubs', '6_of_diamonds', '6_of_hearts', '6_of_spades',
    '7_of_clubs', '7_of_diamonds', '7_of_hearts', '7_of_spades',
    '8_of_clubs', '8_of_diamonds', '8_of_hearts', '8_of_spades',
    '9_of_clubs', '9_of_diamonds', '9_of_hearts', '9_of_spades',
    '10_of_clubs', '10_of_diamonds', '10_of_hearts', '10_of_spades',
    'jack_of_clubs', 'jack_of_diamonds', 'jack_of_hearts', 'jack_of_spades',
    'queen_of_clubs', 'queen_of_diamonds', 'queen_of_hearts', 'queen_of_spades',
    'king_of_clubs', 'king_of_diamonds', 'king_of_hearts', 'king_of_spades'
];
var cartasUser = [];
var cartasDealer = [];
var cartasRepartidas = 0;
var cartasRepartidasUser = 0;
var cartasRepartidasDealer = 0;
var puntajeUser = 0;
var puntajeDealer = 0;
var temp;

function main() { // cada que inicie juego reparte 2 cartas a cada 1
    shuffle(cartas);
    clearDivs();
    repartirCartas('1');
    repartirCartas('1');
    repartirCartas('2');
    repartirCartas('2');
    
    // ocultar la 1ra carta del dealer
    temp = document.getElementById('dealer_0').innerHTML;
    document.getElementById('dealer_0').innerHTML = '<img src="../images_Poker/red_joker.png" width="150" height="200">';    
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function repartirCartas(jugador) {
    var cardName = cartas[cartasRepartidas]; // obtener el nombre de la tarjeta
    
    // obtener el valor de la tarjeta
    var temp = cardName.split('_');
    if (temp[0] === "jack"  ||  temp[0] === "queen"  ||  temp[0] === "king") {
        temp[0] = 10; // ignoramos la tarjeta "ace"
    }
    if (jugador === '1') cartasUser.push(temp[0]);
    else if (jugador === '2') cartasDealer.push(temp[0]);
    
    calcularSuma(jugador); // es necesario esta función ya que las cartas 'ace' su valor no es estático
    
    if (jugador === '1') {
        document.getElementById('user_' + cartasRepartidasUser).innerHTML = '<img src="../images_Poker/' + cardName + '.png" height="200" width="150"/>';
        cartasRepartidasUser ++;
    }
    else if (jugador === '2') {
        document.getElementById('dealer_' + cartasRepartidasDealer).innerHTML = '<img src="../images_Poker/' + cardName + '.png" height="200" width="150"/>';
        cartasRepartidasDealer ++;
    }
    cartasRepartidas ++;
}

function calcularSuma(jugador) {
    var cartasAce = 0; // indica el número de tarjetas ace
    var suma = 0;
    
    if (jugador === '1') {
        for (i=0; i<cartasUser.length; i++) {
            if (cartasUser[i] === "ace") {
                cartasAce ++;
            }
            else {
                suma += parseInt(cartasUser[i]);
            }
        }
    }
    else if (jugador === '2') {
        for (i=0; i<cartasDealer.length; i++) {
            if (cartasDealer[i] === "ace") {
                cartasAce ++;
            }
            else {
                suma += parseInt(cartasDealer[i]);
            }
        }
    }

    if (cartasAce !== 0) {
        if (cartasAce === 1) {
            if (suma <= 10) suma += 11; // la carta ace toma como valor 11
            else suma++; // la carta ace toma como valor 1
        }
        else {
            if (suma + cartasAce <= 11) suma += 12;
            else suma += 2;
        }        
    }
    
    if (jugador === '1') {
        document.getElementById('user_9').innerHTML = '<p>' + suma + '</p>';
        puntajeUser = suma;
    }
    else if (jugador === '2') {
        document.getElementById('dealer_9').innerHTML = '<p>' + suma + '</p>';
        puntajeDealer = suma;
    }
    //alert(suma);
}

function IA_dealer() {
    document.getElementById('dealer_0').innerHTML = temp; // quitar la carta oculta
    
    while (puntajeDealer < puntajeUser) {
        repartirCartas('2');
    }
    compararPuntajes();
}

function compararPuntajes() {
    if (puntajeDealer == 21) {
        alert("Has perdido");
    }
    else if (puntajeUser > 21) {
        alert("Has perdido");
    }
    else if (puntajeDealer > 21) {
        alert("Has ganado");
    }
    else if (puntajeUser < 21  &&  puntajeDealer > puntajeUser  &&  puntajeDealer <= 21) {
        alert("Has perdido");
    }
    else if (puntajeDealer < 21  &&  puntajeUser > puntajeDealer  &&  puntajeUser <= 21) {
        alert("Has ganado");
    }
    else if (puntajeUser === puntajeDealer) {
        alert("Juego empatado");
    }
}

function clearDivs(){ // borra las cartas en los 2 lados
    for (var i = 0; i<6; i++) {
        document.getElementById('user_'+i).innerHTML="";
        document.getElementById('dealer_'+i).innerHTML="";
    }
}

function reset() {
    cartasUser = [];
    cartasDealer = [];
    cartasRepartidas = 0;
    cartasRepartidasUser = 0;
    cartasRepartidasDealer = 0;
    puntajeUser = 0;
    puntajeDealer = 0;
    temp;
    
    main();
}