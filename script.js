const chessPlaces = document.querySelectorAll('.chess-place');
const message = document.querySelector('.message');
const black_place = document.querySelector('.black-place');
const white_place = document.querySelector('.white-place');

let curr_player = 'black';

chessPlaces.forEach(function(place) {
    place.addEventListener('click', function() {
        var row = parseInt(place.dataset.row);
        var col = parseInt(place.dataset.col);

        console.log('Clicked cell: Row ' + row + ', Column ' + col);
    });
});

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

    let allowed_place = [];
    message.innerHTML = ``;
    let clickedPlace = event.currentTarget;
    const hasImg = clickedPlace.querySelector('img');
    if (hasImg) {
        if (selectedPiece == hasImg) {
            selectedPiece = null;
            returnColor();
        }
        if (selectedPiece === null) {
            selectedPiece = hasImg;
            bgColor = hasImg.style.backgroundColor;
            if (selectedPiece.classList.contains(curr_player)) {
                clickedPlace.style.backgroundColor = '#fff35f';
                imgClass = hasImg.classList;
                if (imgClass.contains('rook')) {
                    allowed_place = rookFunction(selectedPiece, allowed_place);
                    console.log(allowed_place);
                    handleAllowedPlaces(allowed_place);
                }else if (imgClass.contains('knight')) {
                    allowed_place = knightFunction(selectedPiece, allowed_place);
                    console.log(allowed_place);
                    handleAllowedPlaces(allowed_place);
                }
                // else if (imgClass.contains('bishop')) {
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
            console.log(`selected piece availabe `);
            selectedPiece = null;
            returnColor();
        }
    }
    else {
        if (selectedPiece) {
            console.log(selectedPiece);
            // Move the selected piece to the clicked place
            let piece = clickedPlace.querySelector('.piece');
            if (!piece) {
                piece = document.createElement('div');
                piece.classList.add('piece');
                clickedPlace.appendChild(piece);
            }
            piece.innerHTML = selectedPiece.outerHTML;
            // clickedPlace.appendChild(selectedPiece.cloneNode(true));

            // Reset styles of original place
            const originalPlace = selectedPiece.parentElement.parentElement;
            originalPlace.innerHTML = '';
            originalPlace.style.backgroundColor = originalPlace.dataset.defaultColor;

            // Reset selectedPiece and styles
            selectedPiece = null;
            chessPlaces.forEach(place => {
                const defaultColor = place.dataset.defaultColor;
                place.style.backgroundColor = defaultColor;
                place.style.pointerEvents = 'auto';
                place.style.opacity = '1';
            });
        }
    }
}

function rookFunction(hasImg, allowed_place) {
    let row = parseInt(hasImg.parentElement.parentElement.dataset.row);
    // console.log(row);
    let col = parseInt(hasImg.parentElement.parentElement.dataset.col);
    allowed_place.push([row, col]);
    // console.log(col);
        console.log(row,col);
        for (let i = col+1; i <= 8; i++) {                 // to check rook movement onto front           
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
        // console.log(row,col);
        for (let i = col-1; i > 0; i--) {                 // to check rook movement onto backwards
            way_place = document.querySelector(`[data-row="${row}"][data-col="${i}"]`)
            hasPiece = way_place.querySelector('img');
            if (hasPiece) {
                console.log(hasPiece.classList.contains(curr_player));
                if (hasPiece.classList.contains(curr_player))
                    break;
                allowed_place.push([row,i])
                break;
            }
            allowed_place.push([row,i])
        }
        // console.log(row,col);
        for (let i = row+1; i <= 8; i++) {                 // to check rook movement onto front
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
        // console.log(row,col);
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
    // console.log(allowed_place)
    return allowed_place;
}

// function knightFunction(hasImg, allowed_place) {
//     let row = parseInt(hasImg.parentElement.parentElement.dataset.row);
//     console.log(row);
//     let col = parseInt(hasImg.parentElement.parentElement.dataset.col);
//     console.log(col);
//         console.log(row,col);
//         for (let i = col+1; i <= 8; i++) {                 // to check rook movement onto front           
//             way_place = document.querySelector(`[data-row="${row}"][data-col="${i}"]`)
//             hasPiece = way_place.querySelector('img');
//             if (hasPiece) {
//                 if (hasPiece.classList.contains(curr_player))
//                     break;
//                 allowed_place.push([row,i])
//                 break;
//             }
//             allowed_place.push([row,i])
//         }
//         console.log(row,col);
//         for (let i = col-1; i > 0; i--) {                 // to check rook movement onto backwards
//             way_place = document.querySelector(`[data-row="${row}"][data-col="${i}"]`)
//             hasPiece = way_place.querySelector('img');
//             if (hasPiece) {
//                 console.log(hasPiece.classList.contains(curr_player));
//                 if (hasPiece.classList.contains(curr_player))
//                     break;
//                 allowed_place.push([row,i])
//                 break;
//             }
//             allowed_place.push([row,i])
//         }
//         console.log(row,col);
//         for (let i = row+1; i <= 8; i++) {                 // to check rook movement onto front
//             way_place = document.querySelector(`[data-row="${i}"][data-col="${col}"]`)
//             hasPiece = way_place.querySelector('img');
//             if (hasPiece) {
//                 if (hasPiece.classList.contains(curr_player))
//                     break;
//                 allowed_place.push([i,col])
//                 break;
//             }
//             allowed_place.push([i,col])
//         }
//         console.log(row,col);
//         for (let i = row-1; i > 0; i--) {                 // to check rook movement onto backwards            
//             way_place = document.querySelector(`[data-row="${i}"][data-col="${col}"]`)
//             hasPiece = way_place.querySelector('img');
//             if (hasPiece) {
//                 if (hasPiece.classList.contains(curr_player))
//                     break;
//                 allowed_place.push([i,col])
//                 break;
//             }
//             allowed_place.push([i,col])
//         }
//     console.log(allowed_place)
//     return allowed_place;
// }




function handleAllowedPlaces(allowed_places) {
    const chessPlacesArray = Array.from(chessPlaces);

    chessPlacesArray.forEach(place => {
        const placeRow = place.dataset.row;
        const placeCol = place.dataset.col;
        let way_place = [parseInt(placeRow), parseInt(placeCol)]
        // console.log(way_place);
        if (!(isNestedArrayPresent(allowed_places,way_place))) {
            place.style.pointerEvents = "none";
            place.style.opacity = "0.3";
        }
    });
}

function isNestedArrayPresent(mainArray, nestedArray) {
    return mainArray.some(arr => 
        arr.length === nestedArray.length &&
        arr.every((value, index) => value === nestedArray[index])
    );
}
function returnColor() {
    chessPlaces.forEach(place => {
        const defaultColor = place.dataset.defaultColor;
        place.style.backgroundColor = defaultColor;
        place.style.pointerEvents = "auto";
        place.style.opacity = "1";
    });
}



// function handleAllowedPlaces(allowed_places) {
//     allowed_places.forEach(function(coordinates) {
//         let row = coordinates[0];
//         let col = coordinates[1];
//         console.log(row,col)
//         highlightCell(row,col);
//     });
// }

// function highlightCell(row,col) {
//     const chessPlacesArray = Array.from(chessPlaces);

//     chessPlacesArray.forEach(place => {
//         const placeRow = place.dataset.row;
//         const placeCol = place.dataset.col;
//         place.style.pointerEvents = "none";
//         place.style.opacity = "0.5";

//         console.log(`Row: ${row}, Col: ${col}, PlaceRow: ${placeRow}, PlaceCol: ${placeCol}`);
//         // if (!way_place.includes(document.querySelector(`[data-row="${placeRow}"][data-col="${placeCol}"]`))) {
//         if (row!==placeRow || col!==placeCol) {
//             place.style.pointerEvents = "none";
//             place.style.opacity = "0.5";
//         }
//     });
// }

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
// 