import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"; //firebase/app
import { getFirestore , collection , onSnapshot, addDoc , where , query, orderBy } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'; 
import { getAuth ,  signOut , onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js'; //firebase/auth
const signOutBtn = document.getElementById('logOut');

const app = initializeApp(
  {
      apiKey: "AIzaSyALbII4jAS-6FRf-PIfbV5rSXaqmJtdJYc",
      authDomain: "tictactoe-abdiev.firebaseapp.com",
      projectId: "tictactoe-abdiev",
      storageBucket: "tictactoe-abdiev.appspot.com",
      messagingSenderId: "304561513893",
      appId: "1:304561513893:web:ddfe006dad53b4d553344c"
    }
);

const db = getFirestore(app);
const auth = getAuth(app);
const colRef = collection(db,'users')




const gameboard = document.getElementById("gameBoard");
const boxes = Array.from(document.getElementsByClassName("box"));
const restartBtn = document.getElementById("restartBtn");
const playText = document.getElementById("playText");
const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;
let pc = X_TEXT;
let turnIndex = 0;
let gameOver = false;
let winner = null;

const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    if (index < 3) {
      styleString += `border-bottom: 5px solid var(--mainColor);`;
    }
    if (index % 3 === 0) {
      styleString += `border-right: 5px solid var(--mainColor);`;
    }
    if (index % 3 === 2) {
      styleString += `border-left: 5px solid var(--mainColor);`;
    }
    if (index > 5) {
      styleString += `border-top: 5px solid var(--mainColor);`;
    }
    box.style = styleString;

    box.addEventListener("click", boxClicked);
  });
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id] && turnIndex % 2 == 0 && gameOver == false) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
  
  
    if (hasPlayerWon(currentPlayer)) {
      playText.innerText = 'You win!!';
      gameOver = true;
      winner = currentPlayer;
      return;
    }
    else {
      setTimeout(function() {
        pcTurn();
     },500)
     turnIndex = turnIndex + 1;
    }
    checktie();
    
  }
}

const hasPlayerWon = (player) => {
  
  if (spaces[0] === player) {
    if (spaces[1] === player && spaces[2] === player) {
      return true;
    }
    if (spaces[3] === player && spaces[6] === player) {
      return true;
    }
    if (spaces[4] === player && spaces[8] === player) {
      return true;
    }
    
  }

  if (spaces[8] === player) {
    if (spaces[2] === player && spaces[5] === player) {
      return true;
    }
    if (spaces[7] === player && spaces[6] === player) {
      return true;
    }
    
  }

  if (spaces[4] === player) {
    if (spaces[3] === player && spaces[5] === player) {
      return true;
    }
    if (spaces[1] === player && spaces[7] === player) {
      return true;
    }
    
  }
  if (spaces[2] === player) {
    if (spaces[4] === player && spaces[6] === player) {
      return true;
    }
  
  
  }
};

restartBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
  });
  playText.innerText = 'tic tac toe';
  gameOver = false;
  winner = null;
  turnIndex = 0;
  for (let g = 0;g < 9 ;g ++) {
    spaces[g] = null;
  }
});


function pcTurn() {
    let r = Math.floor(Math.random() * 9);
    while (spaces[r] != null  && spaces.includes(null)) {
        r = Math.floor(Math.random() * 9);
    }
    if (spaces[r] == null && spaces.includes(null)){
      spaces[r] = pc;
      document.getElementById(`${r}`).innerText = pc;
      turnIndex = turnIndex + 1;
    }
    
          
    if (hasPlayerWon(pc) ) {
      playText.innerText = 'Bot wins!!';
      gameOver = true;
      winner = pc;
      return;
    }
  }

function checktie() {
  if (winner == null && spaces.includes(null) == false) {
    playText.innerText = "It's a draw";
    gameOver = true;
  }
}

drawBoard();
signOutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Logging out will finish in 5 sec')
  addDoc(colRef, {
    nick: 'Tech',
    streak: 18,
  })

  .then(() => {
    logout();
    window.location.href="../index.html";
  })
})

const logout = async () => {
        await signOut(auth);
}




