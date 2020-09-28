let createWordButton = document.getElementsByName('createWord')[0];
createWordButton.onclick = function (event) {
    event.preventDefault();
    let form = document.forms.hangmanFirst;
    let elem = form.elements;
    let word = elem.word.value;
    let desc = elem.description.value;
    console.log(word, desc)
    showForm(desc);
    setWord(word);

}
let leters;
let hidden = [];
let hiddenWord;
let mistekes = [];


function setWord(word) {

    leters = word.toLowerCase().trim().split('');
    leters.forEach(element => {
        if (element == " ") hidden.push("&nbsp");
        hidden.push("_")
    });
    hiddenWord = hidden.join(" ");
    document.querySelector('#check').onclick = function (event) {
        event.preventDefault();
        checkAnswer();
    }
    showWord()
}

function showForm(desc) {
    document.forms.hangmanFirst.hidden = true;
    document.forms.hangmanNext.hidden = false;
    document.querySelector('#meaning').textContent = desc;
    }

function showWord(...arg) {
    let word = document.querySelector('#hiddenWord');
    word.innerHTML = hiddenWord;
    document.querySelector('#tryGuess').value = "";
}


function guess(answer) {
    let div = document.querySelector('#mistakes');
    let max = 6;
    if (hidden.includes(answer)) alert (`Ты уже отгадал ${answer}`);
    if (leters.includes(answer)) {
        leters.filter((it, index) => {
            if (it == answer) hidden[index] = it;
        })
        hiddenWord = hidden.join(" ");

    } else if (mistekes.includes(answer)) { alert(`Ты уже называл ${answer}`); }
    else {
        mistekes.push(answer);
        div.innerHTML = `Осталось  ${max - mistekes.length} попыток
       Ты не отгадал ${mistekes.join(", ")}`
    }
    showWord();
}

function checkAnswer() {
    let answer = document.querySelector('#tryGuess').value.trim();
    if (answer.toLowerCase() == leters.join('')) {
        hiddenWord = leters.join(" ");
        showWord();
        confirm("УРААА! Ты ВЫИГРАЛ! Сыграем еще?") ? document.location.reload() : null;
    } else if (answer.match(/^[^\d\s-]$/i)) guess(answer);
    else {
        alert("Ты можешь отгадать одну букву или слово целиком")
    }
}