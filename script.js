const chessPlaces = document.querySelectorAll('.chess-place');

const allPlaces=[
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
    'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
    'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
    'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
    'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'
  ]

const rook = document.querySelectorAll('.rook')
const knight = document.querySelectorAll('knight')
const bishop = document.querySelectorAll('bishop')
const king = document.querySelectorAll('king')
const queen = document.querySelectorAll('queen')
const pawn = document.querySelectorAll('.pawn')

let selectedPiece = null;
let originalPlace = null;
let bgColor = null;

if (selectedPiece===null) {
    chessPlaces.forEach(place => {
        place.addEventListener('click', placeClick);
    });
}

function placeClick(event) {
    const clickedPlace = event.currentTarget;
    const hasImg = clickedPlace.querySelector('img');
    if (hasImg !== null) {
        // console.log(hasImg.classList);
        selectedPiece = hasImg;
        bgColor = hasImg.style.backgroundColor;
        clickedPlace.style.backgroundColor = '#fff35f';

        imgClass = hasImg.classList;
        console.log(hasImg.parentElement.parentElement.classList);
        if (imgClass.contains('rook')) {
            rookFunction(imgClass,hasImg)
        }
    }
}
function rookFunction(imgClass, hasImg) {
    let piecePlace = null;
    parentClass = hasImg.parentElement.parentElement.classList;
    reget = /[a-h][1-8]/;
    parentClass.forEach(className => {
        const match = className.match(reget);
        if (match) {
            piecePlace = match[0];
            let allowed_place = find_allowed_place(piecePlace);
            allowed_place = allowed_place.filter(element => element !== piecePlace);
            allowed_place.forEach(allowed_place => {
                allowed_place = document.querySelector('.' + allowed_place)
                // allowed_place.style.cursor = 'not-allowed';
            })
            console.log(allowed_place);

        }
    })
    console.log(piecePlace);

    function find_allowed_place(piecePlace) {
        let allowed_place = [];
        let column = piecePlace[0];          //h
        let row = piecePlace[1];             //8
        let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for (let i = 1; i < 9; i++){
            allowed_place.push(column+i)
        }
        rows.forEach(eachRow => {
            allowed_place.push(eachRow + row);
        })
        return allowed_place;
    }
}

