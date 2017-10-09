import { Injectable } from '@angular/core';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthData {
  /*
  constructor(public afAuth: AngularFireAuth) {
  }
  */
  constructor(){}

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return null;//this.afAuth.auth.signInWithEmailAndPassword(newEmail,newPassword)
  }

  resetPassword(email: string): firebase.Promise<any> {
    return null;//this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return null;//this.afAuth.auth.signOut();
  }
  
  registerUser(name: string, email: string, password: string,phone: number): firebase.Promise<any> {
    
    /*return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      firebase.database().ref('/userProfile').child(newUser.uid).set({
          email: email,
          name: name,
          phone: phone
      });
    });
*/
    return null;
  }

}

