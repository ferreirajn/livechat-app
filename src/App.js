import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import './App.css';

firebase.initializeApp({
  apiKey: "AIzaSyBajgVIg9-3s-uIDkzmOZ2HkFCGTwnWND0",
  authDomain: "livechar-react.firebaseapp.com",
  projectId: "livechar-react",
  storageBucket: "livechar-react.appspot.com",
  messagingSenderId: "724442713792",
  appId: "1:724442713792:web:228c347097f07293d3a725",
  measurementId: "G-B5DVXHCE1X"
})

const auth = firebase.auth();


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">

      </header>

      <section> 
        {user ? <ChatRoom/> : <SignIn /> }
      </section>

    </div>
  );
}

function SignIn(){

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }

  return ( 
    <button onClick={useSignInWithGoogle}> Sign in with Google </button>
  )

}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut() }> Sign out </button>
  )
}

function ChatRoom() {
  const messagesRed = firestore.collection('messages');
  const query = messagesRef.orderby('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField:'id'});
  return ( 
    <> 
    <div> 
      {messages && messages.map(msg => <ChatMessage key = {msg.id} message={msg} />) }
    </div>
    </>
  )
}


function ChatMessage() {
  const {text , uid} = props.message;

  return <p> {text} </p>
}
export default App;
