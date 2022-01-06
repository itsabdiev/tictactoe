import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"; 
import { getAuth , onAuthStateChanged , signInWithEmailAndPassword ,createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js'; //firebase/auth
import {  getFirestore , collection , onSnapshot, addDoc , where , query, orderBy } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'; // firebase/firestore
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const txtPassword = document.getElementById("txtPassword");
const txtEmail = document.getElementById("txtEmail");
const errLabel = document.getElementById("err");

const provider = new GoogleAuthProvider();


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

    const auth = getAuth(app);
    const db = getFirestore(app);
    
    const colRef = collection(db,'users')



    const loginEmailPassword = async () => {
        const login = txtEmail.value;
        const password = txtPassword.value;
        try {
            const userCredential = await  signInWithEmailAndPassword(auth,login,password);
            window.location.href="app.html";
            
            
        }
        catch(error) {
            console.log(error);
            showLoginError(error);
        }
        
    }

    const showLoginError = (error) => {
        if (error.code == 'auth/invalid-email') {
            errLabel.innerText = 'Invalid email!';
        }
        else if (error.code == 'auth/user-not-found') {
            errLabel.innerText = 'There is no user using this email!';
        }
        else if (error.code == 'auth/wrong-password') {
            errLabel.innerText = 'Incorrect password!';    
        }
        else if (error.code == 'auth/email-already-in-use') {
            errLabel.innerText = 'This email is already in use!';   
        }
        else if (error.code == 'auth/weak-password') {
            errLabel.innerText = 'Weak password!';
        }
        else {
            errLabel.innerText = `${error.code}`;
        }
    }

    const createAccount = async () => {
        const login = txtEmail.value;
        const password = txtPassword.value;
        try {
             const userCredential = await createUserWithEmailAndPassword(auth,login,password);
             errLabel.innerText = 'Account has been created';
             window.location.href = "app.html";
        }
        catch(error) {
            console.log(error);
            showLoginError(error);
        }
    }

   

    
    
    signInBtn.addEventListener('click', loginEmailPassword);
    signUpBtn.addEventListener('click', createAccount);
    document.getElementById('googleBtn').addEventListener('click', () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href="app.html";
          
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          
          const user = result.user;
          
          
        }).catch((error) => {
          
          const errorCode = error.code;
          const errorMessage = error.message;
          
          const email = error.email;
        
          const credential = GoogleAuthProvider.credentialFromError(error);
          
        });
    });