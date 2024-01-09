const chessPlaces = document.querySelectorAll('.chess-place');
const message = document.querySelector('.message');
const black_place = document.querySelector('.black-place');
const white_place = document.querySelector('.white-place');

let players = ['black', 'white'];
let curr_player = 'white';

chessPlaces.forEach(function(place) {
    place.addEventListener('click', function() {
        var row = parseInt(place.dataset.row);
        var col = parseInt(place.dataset.col);

        // console.log('Clicked cell: Row ' + row + ', Column ' + col);
    });
});

// const rook = document.querySelectorAll('.rook')
// const knight = document.querySelectorAll('.knight')
// const bishop = document.querySelectorAll('.bishop')
// const king = document.querySelectorAll('.king')
// const queen = document.querySelectorAll('.queen')
// const pawn = document.querySelectorAll('.pawn')
let allowed_place = [];
let selectedPiece = null;
let originalPlace = null;
let bgColor = null;
let targetPlace = null;

chessPlaces.forEach(place => {
    place.addEventListener('click', placeClick);
});

function placeClick(event) {
    // console.log("Player is : "+curr_player);

    allowed_place = [];
    message.innerHTML = ``;
    let clickedPlace = event.currentTarget;
    const hasImg = clickedPlace.querySelector('img');
    if (hasImg) {
        if (selectedPiece == hasImg) {
            console.log("exit by clicking same piece");
            selectedPiece = null;
            returnColor();
        }
        else if (selectedPiece === null) {
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
                }else if (imgClass.contains('bishop')) {
                    allowed_place = bishopFunction(selectedPiece, allowed_place);
                    console.log(allowed_place);
                    handleAllowedPlaces(allowed_place);
                }else if (imgClass.contains('queen')) {
                    allowed_place = queenFunction(selectedPiece, allowed_place);
                    console.log(allowed_place);
                    handleAllowedPlaces(allowed_place);
                }else if (imgClass.contains('king')) {
                    allowed_place = kingFunction(selectedPiece, allowed_place);
                    // console.log(allowed_place);
                    handleAllowedPlaces(allowed_place);
                }else if (imgClass.contains('pawn')) {
                    allowed_place = pawnFunction(selectedPiece, allowed_place);
                    // console.log(allowed_place);
                    handleAllowedPlaces(allowed_place);
                }
                
            }else {
                message.innerHTML = 'Select one of your pieces!';
                selectedPiece = null; // Reset selectedPiece
            }
        } else {
            targetPlace = clickedPlace;
            let targetPiece = targetPlace.querySelector('img');
            console.log(selectedPiece);
            console.log(targetPlace);
            console.log(targetPiece);
            attackOpponent(selectedPiece, targetPlace,targetPiece);   //Attacking opponent
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
            curr_player = (curr_player === players[0]) ? players[1] : players[0];

            chessPlaces.forEach(place => {
                const defaultColor = place.dataset.defaultColor;
                place.style.backgroundColor = defaultColor;
                place.style.pointerEvents = 'auto';
                place.style.opacity = '1';
            });
        }
    }
}

function rookFunction(hasImg, allowed_place) {  // from the clicked im seeing all 4 side from that place , so 4 for loop
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

function knightFunction(hasImg, allowed_place) { // same as rook function but i,j in for loop has changed according to its movement
    console.log('hello da');
    let row = parseInt(hasImg.parentElement.parentElement.dataset.row);
    // console.log(row);
    let col = parseInt(hasImg.parentElement.parentElement.dataset.col);
    allowed_place.push([row, col]);

    let possibleMoves = [
        [row + 2, col - 1], [row + 2, col + 1],
        [row - 2, col + 1], [row - 2, col - 1],
        [row - 1, col + 2], [row + 1, col + 2],
        [row + 1, col - 2], [row - 1, col - 2]
    ];

    possibleMoves.forEach(place => {
        let hasPlace = document.querySelector(`[data-row="${place[0]}"][data-col="${place[1]}"]`);
        if (hasPlace) {
            let hasImg = hasPlace.querySelector('img');
            console.log(hasImg);
            if (hasImg) {
                if (!(hasImg.classList.contains(curr_player))) {
                    allowed_place.push(place);
                } 
            }else {
                allowed_place.push(place);
            }
        }
    });
    return allowed_place;
}

function bishopFunction(hasImg, allowed_place) { // same as rook function but i,j in for loop has changed according to its movement
    console.log('hello da');
    let row = parseInt(hasImg.parentElement.parentElement.dataset.row);
    // console.log(row);
    let col = parseInt(hasImg.parentElement.parentElement.dataset.col);
    allowed_place.push([row, col]);
    // console.log(col);
    console.log(row, col);
    for (let i = row + 1, j = col + 1; i <= 8 && j <= 8; i++, j++){
        console.log("check 6,6");             // to check bishop movement onto front
        way_place = document.querySelector(`[data-row="${i}"][data-col="${j}"]`)
        hasPiece = way_place.querySelector('img');
        if (hasPiece) {
            if (hasPiece.classList.contains(curr_player))
                break;
            allowed_place.push([i,j])
            break;
        }
        allowed_place.push([i,j])
    }
        // console.log(row,col);
        for (let i = row + 1, j = col - 1; i <= 8 && j >= 1; i++, j--) {                 // to check bishop movement onto backwards
        way_place = document.querySelector(`[data-row="${i}"][data-col="${j}"]`)
            hasPiece = way_place.querySelector('img');
            if (hasPiece) {
                console.log(hasPiece.classList.contains(curr_player));
                if (hasPiece.classList.contains(curr_player))
                    break;
                allowed_place.push([i,j])
                break;
            }
            allowed_place.push([i,j])
        }
        // console.log(row,col);
        for (let i = row - 1, j = col + 1; i >=1 && j <= 8; i--, j++) {                 // to check bishop movement onto front
        way_place = document.querySelector(`[data-row="${i}"][data-col="${j}"]`)
            hasPiece = way_place.querySelector('img');
            if (hasPiece) {
                if (hasPiece.classList.contains(curr_player))
                    break;
                allowed_place.push([i,j])
                break;
            }
            allowed_place.push([i,j])
        }
        // console.log(row,col);
        for (let i = row - 1, j = col - 1; i >= 1 && j >= 1; i--, j--) {                 // to check bishop movement onto backwards            
        way_place = document.querySelector(`[data-row="${i}"][data-col="${j}"]`)
            hasPiece = way_place.querySelector('img');
            if (hasPiece) {
                if (hasPiece.classList.contains(curr_player))
                    break;
                allowed_place.push([i,j])
                break;
            }
            allowed_place.push([i,j])
        }
    console.log(allowed_place)
    return allowed_place;
}

function queenFunction(hasImg, allowed_place) {     // I just Combined both rook n bishop mivement 
    let rook_allowed_place = rookFunction(hasImg, allowed_place);
    let bishop_allowed_place = bishopFunction(hasImg, allowed_place);
    allowed_place = rook_allowed_place.concat(bishop_allowed_place);
    // console.log(allowed_place);
    return allowed_place;
}

function kingFunction(hasImg, allowed_place) {
    let row = parseInt(hasImg.parentElement.parentElement.dataset.row);
    // console.log(row);
    let col = parseInt(hasImg.parentElement.parentElement.dataset.col);
    allowed_place.push([row, col]);
    placeArray = [[row, col], [row + 1, col], [row + 1, col + 1], [row, col + 1], [row - 1, col], [row - 1, col - 1], [row, col - 1], [row + 1, col - 1], [row - 1, col + 1]];
    placeArray.forEach(place => {
        console.log(place);
        way_place = document.querySelector(`[data-row="${place[0]}"][data-col="${place[1]}"]`)
        if (way_place) {
            hasPiece = way_place.querySelector('img');
            if (hasPiece) {
                if (!(hasPiece.classList.contains(curr_player)))
                    allowed_place.push([place[0], place[1]])
            }
            else {
                allowed_place.push([place[0], place[1]]);
            }
        }
    });
    return allowed_place; 
}

function pawnFunction(hasImg, allowed_place) {
    // let color = hasImg.classList.contains('black') ? 'black' : 'white';
    let first, second, left, right;                                                  //to check first step , second step , right and left for cutting
    let row = parseInt(hasImg.parentElement.parentElement.dataset.row);
    // console.log(row);
    let col = parseInt(hasImg.parentElement.parentElement.dataset.col);
    allowed_place.push([row, col]);
    if (curr_player === 'black') {                                          //if black it comes from top to bottom
        first = [row - 1, col];                                             
        second = [row - 2, col];
        // console.log('black first '+first);

        left = [row - 1, col + 1];
        right = [row - 1, col - 1];
    } else if (curr_player === 'white') {                                       // for white in bottom to top
        first = [row + 1, col];
        second = [row + 2, col];
        // console.log('white first '+first);
        left = [row + 1, col - 1];
        right = [row + 1, col + 1];
    }
    if ((row == 7 && curr_player=='black') || (row==2 && curr_player=='white')) {    // checks whether it is first move for that pawn
        // console.log('first place '+first);                                          // if it is 1st move allow 2 place else 1 place
        let block = false;
        let placeArray = [first,second];
        placeArray.forEach(place => {
            if (! block) {
                // console.log('hello da dei' + place[0]);
                way_place = document.querySelector(`[data-row="${place[0]}"][data-col="${place[1]}"]`)
                if (way_place) {
                    hasPiece = way_place.querySelector('img');
                    if (!hasPiece) {
                        allowed_place.push([place[0], place[1]]);
                    } else {
                        block = true;
                    }
                }
            }
        });
    }
    else {
        way_place = document.querySelector(`[data-row="${first[0]}"][data-col="${first[1]}"]`);
            if (way_place) {
                hasPiece = way_place.querySelector('img');
                if (! hasPiece) {
                    allowed_place.push([first[0], first[1]]);
                }
            }
    }
    cross_cut_1 = document.querySelector(`[data-row="${left[0]}"][data-col="${left[1]}"]`);     // check for cutting in both sides
    cross_cut_2 = document.querySelector(`[data-row="${right[0]}"][data-col="${right[1]}"]`);
    if (cross_cut_1) {
        cross_cut_1_img = cross_cut_1.querySelector('img');
        let one_side = pawn_side_cuts(cross_cut_1_img, left);
        if (one_side) {
            allowed_place.push(one_side);
        }
    }
    if (cross_cut_2) {
        cross_cut_2_img = cross_cut_2.querySelector('img');
        let two_side = pawn_side_cuts(cross_cut_2_img, right);
        if (two_side) {
            allowed_place.push(two_side);
        }
    }
    function pawn_side_cuts(img, side) {
        if (img) {
            let imgClass = img.classList;
            // console.log('imgClass ' + imgClass);
            // console.log((imgClass.contains(curr_player)));
            if (!(imgClass.contains(curr_player))) {
                return side;
            }
        }
        else {
            return null;
        }
        
    }
    // console.log(allowed_place);
    return allowed_place; 
}

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

function attackOpponent(selectedPiece, targetPlace, targetPiece) {
    player = (curr_player === players[0]) ? players[1] : players[0];
    const opponent_Player = (curr_player === players[0]) ? players[1] : players[0];

    if (selectedPiece.classList.contains(curr_player)) {
        if ((targetPiece.classList.contains(opponent_Player))) {
            const cuttedPiece_place =document.querySelector('.cuttedPiece');
            console.log(`selected piece availabe `);
        
            // Move selectedPiece to targetPlace
            target = targetPlace.querySelector('.piece');
            target.innerHTML = ``;
            target.appendChild(selectedPiece);

            // Move targetPiece to cuttedPiece_place
            cuttedPiece_place.appendChild(targetPiece);
            // Reset selectedPiece and styles
            selectedPiece = null;
            curr_player = (curr_player === players[0]) ? players[1] : players[0];

            chessPlaces.forEach(place => {
                const defaultColor = place.dataset.defaultColor;
                place.style.backgroundColor = defaultColor;
                place.style.pointerEvents = 'auto';
                place.style.opacity = '1';
            });
        }
    }
}