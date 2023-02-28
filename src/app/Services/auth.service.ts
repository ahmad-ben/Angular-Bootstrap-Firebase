import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireBaseAuth: AngularFireAuth,
    private router: Router
  ) { }

  //Login Method
  Login(email: string, password: string){
    this.fireBaseAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem('token', 'true');
        if(res.user?.emailVerified == true){
          this.router.navigateByUrl('/dashboard');
        }else{
          this.router.navigateByUrl('/verify-email');
        }
      }, (err) => {
        alert(err.message);
        this.router.navigateByUrl('/login');
      })
  }

  //Register Method
  register(email: string, password: string){
    this.fireBaseAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        alert('Registering Success.');
        this.router.navigateByUrl('/login');
        console.log(res);
        console.log(res.user);
        this.sendEmailForVerification(res.user);
      }, (err) => {
        alert(err.message);
        this.router.navigateByUrl('/register');
      })
  }

  //Sign Out
  logout(){
    this.fireBaseAuth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      }, (err) => {
        alert(err.message);
      })
  }

  //Forgot Password
  forgotPassword(email: string){
    this.fireBaseAuth.sendPasswordResetEmail(email).then(
      () => {this.router.navigateByUrl('/verify-email')},
      (err) => {alert('Something Went Wrong.')}
    )
  }

  //Email Verification
  sendEmailForVerification(user: firebase.default.User | null) {
    user?.sendEmailVerification().then(
      (res) => {this.router.navigateByUrl('/verify-email')},
      (err) => {alert('SomeThing Went Wrong, Not Able To Send Mail To Your Email.')}
    )
  }

  //Sign Up With Google
  signUpWithGoogle() {
    this.fireBaseAuth.signInWithPopup(new GoogleAuthProvider).then(
      (res) => {
        this.router.navigateByUrl('dashboard');
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
      },
      (err) => {err.message}
    )
  }
}
