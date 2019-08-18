import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCzTUEsWYld7l4na2l_FILWu3dfi1JcyTM",    
    authDomain: "portofolio-panjilei.firebaseapp.com",    
    databaseURL: "https://portofolio-pganjilei.firebaseio.com",    
    storageBucket: "portofolio-panjilei.appspot.com",        
};    

export default firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider()

