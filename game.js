let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turn = true;

let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8], 
];

const resetGame = () => {
    turn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBtn.setAttribute("id" , "reset");
    count = 0;
};

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        if (turn) {
            box.setAttribute("id","boxO")
            box.innerText = "O";
            turn = false;
        } else {
            box.setAttribute("id", "boxX")
            box.innerText = "X";
            turn = true;       
        };

        box.disabled = true;
        count++;

        let iswinner = checkWinner();

        if(count === 9 && !iswinner) {
            draw();
        }
    });
});

const disabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";

    }
}


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    resetBtn.setAttribute("id", "hideBtn");
}

const draw = () => {
    msg.innerText = "The game had draw! please start a new game";
    msgContainer.classList.remove("hide");
    disabledBoxes();
    resetBtn.setAttribute("id", "hideBtn");
}

const checkWinner = () => {
    for(let patterns of winPatterns) {
        let pos0Val = boxes [patterns[0]].innerText;
        let pos1Val = boxes [patterns[1]].innerText;
        let pos2Val = boxes [patterns[2]].innerText;
        
        if (pos0Val !== "" && pos1Val !== "" && pos2Val !== ""){
            if (pos0Val === pos1Val && pos1Val === pos2Val) {
                showWinner(pos0Val);
                return true;
            }
            }
        }
    };

newGameBtn.addEventListener("click" , resetGame);
resetBtn.addEventListener("click", resetGame);

