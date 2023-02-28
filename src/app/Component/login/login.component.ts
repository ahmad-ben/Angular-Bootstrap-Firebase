import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{
  email: string= '';
  password: string= '';
  constructor(private auth: AuthService){}
  ngAfterViewInit(): void {
    this.email = '' ;
    this.password = '' ;
  }
  login(){
    if(this.email == '' || this.password == ''){
      alert('Please Enter Your Info Correctly.')
    }else{
      this.auth.Login(this.email, this.password);
      this.email = '' ;
      this.password = '' ;
    }
  }
  signUpWithGoogle(){
    this.auth.signUpWithGoogle();
  }
}
