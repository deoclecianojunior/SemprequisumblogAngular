import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  
  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  verifyLogin(): Promise<Object>{
    return new Promise((resolve, reject) => {
      this.user.subscribe(user => {
        if(user != null){
          resolve(user)
        }else{
          resolve(false)
        }
      })
    })
  }

  signup(email: string, password: string): Promise<any> {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  login(email: string, password: string): Promise<any> {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  setName(name: string, foto: string){
    this.user.subscribe(user => {
      user.updateProfile({
        displayName: name,
        photoURL: foto
      }).then(u =>{
        console.log(u)
      }).catch(c => {
        console.log(c)
      })
    })
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }
}
