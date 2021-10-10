import firebase from "firebase/app";
import "firebase/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyBM3UgQgJZ85XoB-7U_JZp_uqebrVPsruE",
    authDomain: "fireblog-8b982.firebaseapp.com",
    projectId: "fireblog-8b982",
    storageBucket: "fireblog-8b982.appspot.com",
    messagingSenderId: "746864864590",
    appId: "1:746864864590:web:de7884eca496ac8713c21f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};
export default firebaseApp.firestore();
