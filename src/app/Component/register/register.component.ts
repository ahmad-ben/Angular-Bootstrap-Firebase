import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string= '';
  password: string= '';
  constructor(private auth: AuthService){}
  register(){
    if(this.email == '' || this.password == ''){
      alert('Please Enter Your Info Correctly.')
    }else{
      this.auth.register(this.email, this.password);
      this.email = '' ;
      this.password = '' ;
    }
  }
}
