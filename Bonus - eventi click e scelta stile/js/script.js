// Consegna
// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.


// RIEMPIMENTO HEADER
const pageHeader = document.querySelector(`header`);
pageHeader.innerHTML = `
    <div class="container-fluid">
        <div class="row row-cols-2">
            <div class="col">
                <div class="left_header_wrapper d-flex align-items-center">
                    <img class="w_75p" src="img/logo.jpg" alt="Logo Boolean">
                    <h1 class="fw-bold mb-0">Campo Minato: la Griglia</h1>
                </div>
            </div>
            <div class="col">
                <div class="h-100 select_wrapper d-flex justify-content-end align-items-center">
                    <span>Difficoltà:</span>
                    <select class="form-select form-select-sm h_25p p-0 ps-1 my_grey_borders my_grey_bg fw-bold">
                        <option id="easy" value="1" selected="selected">Easy</option>
                        <option id="medium" value="2">Medium</option>
                        <option id="hard" value="3">Hard</option>
                    </select>
                    <button type="submit" class="start_button w_85p h_25p d-flex justify-content-center align-items-center p-0 btn my_grey_borders my_grey_bg fw-bold position-relative">Play<i class="fas fa-hand-pointer position-absolute"></i></button>
                </div>
            </div>
        </div>
    </div>
`;

// RIEMPIMENTO MAIN (SOLO GRIGLIA VUOTA, MESSAGGIO INIZIALE E ARROWS)
const pageMain = document.querySelector(`main`);
pageMain.innerHTML = `
    <h3 class="colors_slider_title text-center fw-bolder position-absolute">Change colors anytime you want</h3>
    <i class="fas fa-arrow-circle-left position-absolute fs-3"></i>
    <div class="game_wrapper d-flex flex-wrap position-relative slider_green">
        <h2 class="start_title fs-1 fw-bold text-center mb-0 position-absolute">Welcome!</h2>
    </div>
    <i class="fas fa-arrow-circle-right position-absolute fs-3"></i>
`;


// RIEMPIMENTO FOOTER
const pageFooter = document.querySelector(`footer`);
pageFooter.innerHTML = `
    <div class="container-fluid">
        <div class="row row-cols-1">
            <div class="col">
                <div class="footer_span_wrapper d-flex align-items-center">
                    <span class="fs-5 ms_20">Made with <i class="fas fa-heart"></i> by <a href="#">Boolean</a></span>
                </div>
            </div>
        </div>
    </div>
`;

// Variabile hand-pointer
const clickHand = document.querySelector(`.fa-hand-pointer`);

// Variabili arrows
const leftArrow = document.querySelector(`.fa-arrow-circle-left`);
const rightArrow = document.querySelector(`.fa-arrow-circle-right`);

// Variabile per contenitore dei box
const gameContainer = document.querySelector('.game_wrapper');

// Numero di colori disponibili
const colorsAmount = 5;
// Array contentente il nome dei colori
const colorsList = [`green`, `blue`, `purple`, `black`, `coral`];
// Conteggio dei click per il reset alla fine
let sliderClicks = 0;
// Evento click left-arrow
leftArrow.addEventListener('click', function(){

    // Rimuovo la classe del colore precedente
    pageMain.classList.remove(`slider_${colorsList[sliderClicks]}`);
    gameContainer.classList.remove(`slider_${colorsList[sliderClicks]}`);

    // Il conteggio aumenta ma si resetta all'ultimo
    if(sliderClicks > 0){
        sliderClicks--;
    } else{
        sliderClicks = colorsAmount - 1;
    }
    
    // Aggiungo la classe del colore successivo
    pageMain.classList.add(`slider_${colorsList[sliderClicks]}`);
    gameContainer.classList.add(`slider_${colorsList[sliderClicks]}`);
    
});
// Evento click right-arrow
rightArrow.addEventListener('click', function(){
    // Rimuovo la classe del colore precedente
    pageMain.classList.remove(`slider_${colorsList[sliderClicks]}`);
    gameContainer.classList.remove(`slider_${colorsList[sliderClicks]}`);

    // Il conteggio aumenta ma si resetta all'ultimo
    if(sliderClicks < colorsAmount - 1){
        sliderClicks++;
    } else{
        sliderClicks = 0;
    }
    
    // Aggiungo la classe del colore successivo
    pageMain.classList.add(`slider_${colorsList[sliderClicks]}`);
    gameContainer.classList.add(`slider_${colorsList[sliderClicks]}`);
});

// Variabile tasto start
const playButton = document.querySelector('.start_button');
// Variabile select difficoltà
const difficultyChoice = document.querySelector('.form-select');
// Variabile per la scelta difficoltà (do easy di default poiché easy è selected di default)
let userDifficultyChoice = `easy`;
// Decisione della difficoltà da parte dell'utente
difficultyChoice.addEventListener('change', function(){
    switch(difficultyChoice.value){
        case  '1':
            userDifficultyChoice = `easy`;
            break;
        case '2':
            userDifficultyChoice = `medium`;
            break;
        case '3':
            userDifficultyChoice = `hard`;
            break;
    }
});

// Evento click per scatenare il tutto 
playButton.addEventListener('click', function(){

    // Animazione hand-pointer al click
    clickHand.classList.add('click_hand');
    
    // Inserimento overlay (con display none iniziale ad ogni giro) per il messaggio finale
    gameContainer.innerHTML = `
        <div class="end_game flex-column justify-content-center align-items-center">
            <h2 class="final_message text-white"></h2>
            <span class="text-white fs-4">Your score:</span>
            <span class="final_message_score text-white fs-4"></span>
        </div>
    `;

    // Rimuovo i bordi dal container principale al click per fixare lo spazietto che si crea tra i suoi e quelli dei box
    gameContainer.classList.add('borders_fix'); 

    // Richiamo alla funzione principale che contiene tutto il macro funzionamento del gioco
    fillingGameUp(userDifficultyChoice);
});


// FUNZIONI


// Funzione principale per inserimento box e numeri nella griglia di gioco, con i relativi stili
//
// userDifficulty -> difficoltà scelta dall'utente. Sarà determinante per inquadrare il numero di box da generare
//
// return -> questa funzione non ritorna nulla, in quanto scatena semplicemente una serie di eventi
function fillingGameUp (userDifficulty){

    // Rimozione animazione hand-pointer al click (ritardo che coincide con la sua durata per poterla rendere possibile ad ogni click)
    setTimeout(function(){clickHand.classList.remove('click_hand');}, 100) 

    // Il clicksCounter tiene conto di quanti box "safe" vengono clickati
    let clicksCounter = 0;

    // Quantità prestabilita di box "deadly"
    const bombsQuantity = 16;

    // Decisione numero di box in base alla difficoltà
    let numberOfBoxes;
    switch(userDifficulty){
        case `easy`:
            numberOfBoxes = 100;
            break;
        case `medium`:
            numberOfBoxes = 81;
            break;
        case `hard`:
            numberOfBoxes = 49;
            break;
    }

    // Richiamo alla funzione che mi da i numeri da inserire nei box
    const numbersToUse = fillingBoxesUp(userDifficulty);

    // Impostazione della grandezza dei box in base alla classe "easy", "medium" o "hard"
    for(let i = 0; i < numberOfBoxes; i++){
        currentBox = document.createElement('div');
        currentBox.classList.add('box', 'slider_green');
        switch(numberOfBoxes){
            case 100:
                currentBox.classList.add('easy');
                break;
            case 81:
                currentBox.classList.add('medium');
                break;
            case 49:
                currentBox.classList.add('hard');
                break;
        }
        // Inserimento box
        gameContainer.appendChild(currentBox);
        // Inserimento numeri nei box
        currentBox.innerHTML = numbersToUse[i];
        // Evento click per i box "safe"
        currentBox.addEventListener('click', makeThemBlue);
        // Evento click generico
        currentBox.addEventListener('click', function(){
            // Aumenta il contatore dei click "safe"
            clicksCounter++;
            // Debug per non aumentare il counter se clicko più volte lo stesso box
            this.style.pointerEvents = "none";
            // Condizione per la vittoria
            if(clicksCounter === numberOfBoxes - bombsQuantity){
                for(let j = 0; j < numberOfBoxes; j++){

                    // Rimozione a tutti i box della possibilità di essere clickati al game won (anche l'overlay lo impedirebbe)
                    document.getElementsByClassName('box')[j].style.pointerEvents = "none";
                }
                // Ciclo che colora di rosso tutti i box "deadly" al game won (grazie alla classe wrong_box di prima)
                for(let l = 0; l < deadlyNumbersList.length; l++){
                    document.getElementsByClassName('wrong_box')[l].classList.add('deadly');
                }
                // Inserimento messaggio finale di vittoria con relativo score
                document.querySelector(`.end_game`).classList.add('active');
                document.querySelector(`.final_message`).innerHTML = `You Won!`;
                document.querySelector(`.final_message_score`).innerHTML = clicksCounter;
            }
        });   
    }


    // Array contenente i numeri deadly che mi ritorna dalla funzione
    const deadlyNumbersList = deadlyNumbers(numberOfBoxes, bombsQuantity);
    console.log(deadlyNumbersList);

    // Cicli annidati - spiegazione
    //
    // Ciclo "i": Ciclo principale, percorre ogni singolo box di gioco
    // Ciclo "j": Ciclo dei numeri "deadly", confronta ogni numero "deadly" con ogni box di gioco
    // Se il ciclo "j" trova un box corrispondende, gli assegno l'evento del click
    // Ciclo "l": Debug, se il gioco finisce perché si clicka un "deadly", gli altri non saranno più clickabili
    // Ciclo "k": Ciclo necessario per passare la classe "deadly" (colore rosso) a tutti i box con numeri "deadly" al click di uno di loro
     // Ciclo "p": Ciclo necessario per passare la classe "safe" (colore blu) a tutti i box con numeri "safe" al click di un deadly
    for(let i = 0; i < numberOfBoxes; i++){
        
        // Do una classe safe_box di default che mi servirà dopo per far diventare blu tutti i safe al click di un "deadly"
        // Questa classe sarà poi rimossa dai "deadly"
        document.getElementsByClassName('box')[i].classList.add('safe_box');

        for(let j = 0; j < deadlyNumbersList.length; j++){

            // Se il contenuto convertito in numero di un box corrisponde con un numero "deadly"...
            if(parseInt(document.getElementsByClassName('box')[i].innerText) === deadlyNumbersList[j]){

                // ...Gli do una classe wrong_box che mi servirà dopo per far diventare rossi tutti i "deadly" al click di uno di loro
                document.getElementsByClassName('box')[i].classList.add('wrong_box')
                // ...Gli rimuovo la classe "safe_box"
                document.getElementsByClassName('box')[i].classList.remove('safe_box')

                // Evento click sui box "deadly"
                document.getElementsByClassName('box')[i].addEventListener('click', function(){

                    for(let l = 0; l < numberOfBoxes; l++){
                        // Rimozione a tutti i box della possibilità di essere clickati al game over (anche l'overlay lo impedirebbe)
                        document.getElementsByClassName('box')[l].style.pointerEvents = "none";
                    }

                    // Debug clicksCounter (ogni box cliccato aumenta il counter di 1, con questo debug se si clicka un "deadly" farà +1 e -1)
                    // Debug messo per risparmiare la creazione di un array contenente i "safe" clickati
                    clicksCounter--;
                    // Ciclo che colora di rosso tutti i box "deadly" al click di uno di loro (grazie alla classe wrong_box di prima)
                    for(let k = 0; k < deadlyNumbersList.length; k++){
                        document.getElementsByClassName('wrong_box')[k].classList.add('deadly');
                    }
                    // Ciclo che colora di blu tutti i box "safe" al click di un "deadly" 
                    for(let p = 0; p < numberOfBoxes - deadlyNumbersList.length; p++){
                        document.getElementsByClassName('safe_box')[p].classList.add('safe');
                    }
                    
                    // Comparsa overlay e titolo finale
                    document.querySelector(`.end_game`).classList.add('active');
                    document.querySelector(`.final_message`).innerHTML = `Game Over!`;
                    document.querySelector(`.final_message_score`).innerHTML = clicksCounter;
    
                });
            } 
        }
    }
}

// Funzione per assegnare la classe safe ai box
//
// -> non ci sono argomenti in entrata
//
// -> non c'è return, questa funzione scatena semplicemente un evento
function makeThemBlue() {
    this.classList.add('safe');
}

// Funzione per generare un array di numeri diversi tra loro
//
// userDifficulty -> difficoltà scelta dall'utente. Determinante per capire quanti numeri devo generare
//
// return -> la funzione ritorna un array di numeri diversi tra loro, la quantità di numeri dipende dalla difficoltà scelta dall'utente
function fillingBoxesUp(userDifficulty){
    const numbersArray = [];
    let numbersAmount;
    switch(userDifficulty){
        case `easy`:
            numbersAmount = 100;
            break;
        case `medium`:
            numbersAmount = 81;
            break;
        case `hard`:
            numbersAmount = 49;
            break;
    }

    while(numbersArray.length < numbersAmount){
        const currentNumber = Math.floor(Math.random() * numbersAmount) + 1;
        if(!(numbersArray.includes(currentNumber))){
            numbersArray.push(currentNumber);
        }
    }

    // Ordino i numeri in modo crescente
    // Deciso di usare lo splice e while prima per rendere questa funzione adattabile a più valori 
    for(let i = 0; i < numbersAmount; i++){
        for(let j = 0; j < numbersAmount; j++){
            if(numbersArray[i] < numbersArray[j]){
                // Uso lo splice per scambiarli in ordine crescente 
                //Necessario lo [0] altrimenti lo splice mi ritornerebbe un array e non un singolo numero allo scambio
                numbersArray[i] = numbersArray.splice(j, 1, numbersArray[i])[0];
            }
        }
    }

    return numbersArray;
}
    
// Funzione per creare un array di 16 numeri diversi tra loro e tra 1 a 100
//
// maxNumbersRange -> numero di box massimo che può essere generato, definito dalla scelta della difficoltà dell'utente (49 / 81 / 100)
// quantityOfBombs -> quantità di bombe che saranno presenti nel gioco
//
// return -> la funzione ritorna un array di numeri che corrisponderanno coi numeri "deadly" del gioco
function deadlyNumbers (maxNumbersRange, quantityOfBombs){
    const deadlyBoxes = [];
    while(deadlyBoxes.length < quantityOfBombs){
        const currentNumber = Math.floor(Math.random() * maxNumbersRange) + 1;
        if(!(deadlyBoxes.includes(currentNumber))){
            deadlyBoxes.push(currentNumber);
        }
    }
    return deadlyBoxes;
}


