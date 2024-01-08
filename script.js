const chessPlaces = document.querySelectorAll('.chess-place');
const message = document.querySelector('.message');
const black_place = document.querySelector('.black-place');
const white_place = document.querySelector('.white-place');

let curr_player = 'black';

chessPlaces.forEach(function(place) {
    place.addEventListener('click', function() {
        // Get the row and column indices from data attributes
        var row = parseInt(place.dataset.row);
        var col = parseInt(place.dataset.col);

        // Example: Log the row and column when a cell is clicked
        console.log('Clicked cell: Row ' + row + ', Column ' + col);

        // Call your move validation function with row and column parameters
        // moveValidation(row, col);
    });
});

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
const knight = document.querySelectorAll('.knight')
const bishop = document.querySelectorAll('.bishop')
const king = document.querySelectorAll('.king')
const queen = document.querySelectorAll('.queen')
const pawn = document.querySelectorAll('.pawn')

let selectedPiece = null;
let originalPlace = null;
let bgColor = null;

chessPlaces.forEach(place => {
    place.addEventListener('click', placeClick);
});

function placeClick(event) {
    message.innerHTML = ``;
    let clickedPlace = event.currentTarget;
    const hasImg = clickedPlace.querySelector('img');
    if (selectedPiece === null) {
        if (hasImg) {
            // console.log(hasImg.classList);
            selectedPiece = hasImg;
            bgColor = hasImg.style.backgroundColor;
            if (selectedPiece.classList.contains(curr_player)) {
                clickedPlace.style.backgroundColor = '#fff35f';
                imgClass = hasImg.classList;
                if (imgClass.contains('rook')) {
                    rookFunction(imgClass, hasImg)
                }
                // else if (imgClass.contains('knight')) {
                //     knightFunction(imgClass, hasImg)
                // } else if (imgClass.contains('bishop')) {
                //     bishopFunction(imgClass, hasImg)
                // } else if (imgClass.contains('queen')) {
                //     queenFunction(imgClass, hasImg)
                // } else if (imgClass.contains('king')) {
                //     kingFunction(imgClass, hasImg)
                // }
            }else {
                message.innerHTML = 'Select one of your pieces!';
                selectedPiece = null; // Reset selectedPiece
            }
        } else {
            message.innerHTML = `Select any of your piece !`;
            selectedPiece = null;
        }
    }
    else {
        console.log(`selected piece availabe `);
        // black_place.style.backgroundColor = '#779952';
        // white_place.style.backgroundColor = '#edeed1';
        selectedPiece = null;
        chessPlaces.forEach(place => {
            const defaultColor = place.dataset.defaultColor;
            place.style.backgroundColor = defaultColor;
            place.style.pointerEvents = "auto";
            place.style.opacity = "1";
        });
    }
}

function rookFunction(imgClass, hasImg) {
    let piecePlace = null;
    let allowed_place = [];
    let pieceRow = hasImg.parentElement.parentElement.dataset.row;
    console.log(pieceRow);
    let pieceCol = hasImg.parentElement.parentElement.dataset.col;
    console.log(pieceCol);
    allowed_place = find_range(pieceRow, pieceCol);
    
    function find_range(row, col) {
        for (let i = row+1 ; i < 9; i++) {                 // to check rook movement onto front
            way_place = document.querySelector(`[data-row="${i}"][data-col="${col}"]`)
            hasPiece = way_place.querySelector('img');
            if (hasPiece) {
                if (hasPiece.classList.contains(curr_player))
                    break;
                allowed_place.push([i,col])
                break;
            }
            allowed_place.push([toString(i),col])
        }
        for (let i = row-1; i > 0; i--) {                 // to check rook movement onto backwards
            way_place = document.querySelector(`[data-row="${i}"][data-col="${col}"]`)
            hasPiece = way_place.querySelector('img');
            if (hasPiece) {
                if (hasPiece.classList.contains(curr_player))
                    break;
                allowed_place.push([i,col])
                break;
            }
            allowed_place.push([i,col])
        }
        for (let i = col+1 ; i < 9; i++) {                 // to check rook movement onto front
            way_place = document.querySelector(`[data-row="${row}"][data-col="${i}"]`)
            hasPiece = way_place.querySelector('img');
            if (hasPiece) {
                if (hasPiece.classList.contains(curr_player))
                    break;
                allowed_place.push([row,i])
                break;
            }
            allowed_place.push([row,i])
        }
        for (let i = col-1; i > 0; i--) {                 // to check rook movement onto backwards
            way_place = document.querySelector(`[data-row="${row}"][data-col="${i}"]`)
            hasPiece = way_place.querySelector('img');
            if (hasPiece) {
                if (hasPiece.classList.contains(curr_player))
                    break;
                allowed_place.push([row,i])
                break;
            }
            allowed_place.push([row,i])
        }
        console.log(allowed_place);
        return allowed_place;
    }
}

// function rookFunction(imgClass, hasImg) {
//     let piecePlace = null;
//     parentClass = hasImg.parentElement.parentElement.classList;
//     console.log(parentClass);
//     reget = /[a-h][1-8]/;
//     parentClass.forEach(className => {
//         const match = className.match(reget);
//         if (match) {
//             piecePlace = match[0];
            
//             let allowed_place = find_allowed_place(piecePlace);
//             let blocked_place = allPlaces.filter(element => !allowed_place.includes(element));
//             blocked_place.forEach(blocked_place => {
//                 blocked_place = document.querySelector('.' + blocked_place)
//                 blocked_place.style.pointerEvents = "none";
//                 blocked_place.style.opacity = "0.5";
                
//                 // console.log(blocked_place);
//             })
//             console.log(allowed_place);

//         }
//     })
//     console.log(piecePlace);

//     function find_allowed_place(piecePlace) {
//         let allowed_place = [];
//         let column = piecePlace[0];          //h
//         let row = piecePlace[1];                //8

//         if (curr_player === 'black') {
//             for (let i = parseInt(row)+1 ; i < 9; i++) {                 // to check rook movement onto right
//                 way_place = document.querySelector('.' + column + i);
//                 hasPiece = way_place.querySelector('img');
//                 if (hasPiece) {
//                     if (hasPiece.classList.contains(curr_player))
//                         break;
//                     allowed_place.push(column + i)
//                     break;
//                 }
//                 allowed_place.push(column + i)
//             }
//             for (let i = parseInt(row); i > 0; i--){                    // to check rook movement onto left
//                 way_place = document.querySelector('.' + column + i);
//                 hasPiece = way_place.querySelector('img');
//                 if (hasPiece) {
//                     if (hasPiece.classList.contains(curr_player))
//                         break;
//                     allowed_place.push(column + i)
//                     break;
//                 }
//                 allowed_place.push(column + i)
//             }
//             let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
//             let rowPiece = rows.indexOf(row);
//             if (rowPiece !== -1) {
//                 rows.splice(0, rowPiece + 1);
//             }
//             console.log(rows);
//             for (let letter of rows) {
//                 console.log(letter);
//                 way_place = document.querySelector('.' + letter + row);
//                 hasPiece = way_place.querySelector('img');
//                 if (hasPiece) {
//                     if (hasPiece.classList.contains(curr_player))
//                         break;
//                     allowed_place.push(letter + row);
//                     break;
//                 }
//                 allowed_place.push(letter + row);
//             }

//             rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
//             rowPiece = rows.indexOf(row);
//             if (rowPiece !== -1) {
//                 rows.splice(rowPiece);
//             }
//             rows.reverse();
//             console.log(rows);
//             for (let letter of rows) {
//                 way_place = document.querySelector('.' + letter + row);
//                 hasPiece = way_place.querySelector('img');
//                 if (hasPiece) {
//                     if (hasPiece.classList.contains(curr_player))
//                         break;
//                     allowed_place.push(letter + row);
//                     break;
//                 }
//                 allowed_place.push(letter + row);
//             }
//         }
//         console.log(allowed_place);
//         return allowed_place;
//     }
// }

