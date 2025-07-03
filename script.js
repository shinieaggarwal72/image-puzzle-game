const puzzleBlock = document.getElementById('puzzle-block');
const imageUpload = document.getElementById('imageUpload');
let backgroundImage = 'default_img.jpg'; 

generatePuzzle(backgroundImage);

function generatePuzzle(image) {
    puzzleBlock.innerHTML = '';
    const positions = [];

    for (let i = 0; i < 9; i++) {
        positions.push(i);
    }

    positions.sort(() => Math.random() - 0.5);

    for (let pos of positions) {
        const piece = document.createElement('div');
        piece.classList.add('piece');

        const row = Math.floor(pos / 3);
        const col = pos % 3;

        piece.style.backgroundImage = `url(${image})`;
        piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        piece.dataset.index = pos; 
        puzzleBlock.appendChild(piece);
    }
}

let firstSelected = null;

puzzleBlock.addEventListener('click', e => {
    if (!e.target.classList.contains('piece')) return;

    if (!firstSelected) {
        firstSelected = e.target;
        firstSelected.classList.add('selected');
    } else {
        swapPieces(firstSelected, e.target);
        firstSelected.classList.remove('selected');
        firstSelected = null;
        checkWin();
    }
    
});

function swapPieces(piece1, piece2) {
    const temp = document.createElement('div');
    puzzleBlock.insertBefore(temp, piece1);
    puzzleBlock.insertBefore(piece1, piece2);
    puzzleBlock.insertBefore(piece2, temp);
    puzzleBlock.removeChild(temp);
}

function checkWin() {
    const currentPieces = document.querySelectorAll('.piece');
    let correctCount = 0;

    currentPieces.forEach((piece, i) => {
        if (parseInt(piece.dataset.index) === i) {
            correctCount++;
        }
    });

    if (correctCount === 9) {
        setTimeout(() => alert('Yayy!! you\'ve solved the puzzle!'), 100);
    }
}

imageUpload.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        backgroundImage = event.target.result;
        generatePuzzle(backgroundImage);
    };
    reader.readAsDataURL(file);
});


window.addEventListener('load', () => {
    imageUpload.value = '';
});
