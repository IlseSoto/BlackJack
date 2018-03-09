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

function main() {
    shuffle(cartas);
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
    if (temp[0] == "jack"  ||  temp[0] == "queen"  ||  temp[0] == "king") {
        temp[0] = 10; // ignoramos la tarjeta "ace"
    }
    if (jugador == '1') cartasUser.push(temp[0]);
    else cartasDealer.push(temp[0]);
    
    calcularSuma(jugador); // es necesario esta función ya que las cartas 'ace' su valor no es estático
    
    if (jugador == '1') {
        document.getElementById('user_' + cartasRepartidas).innerHTML = '<img src="../images_Poker/' + cardName + '.png" height="200" width="150"/>';
    }
    else {
        document.getElementById('dealer_' + cartasRepartidas).innerHTML = '<img src="../images_Poker/' + cardName + '.png" height="200" width="150"/>';
    }
    
    cartasRepartidas ++;
}