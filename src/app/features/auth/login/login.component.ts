import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model : LoginRequest;

  constructor(private authService:AuthService,private cookieService:CookieService,private router:Router) {
    this.model = {
      email:'',
      password:''
    };
   }

  ngOnInit() {

  }

  onFormSubmit():void{
    this.authService.login(this.model)
    .subscribe({
      next :(response)=>{
        // Set auth cookie and saving the jwt token
        this.cookieService.set('Authorization',`Bearer ${response.token}`,
        undefined,'/',undefined,true,'Strict');

        //Set User
        this.authService.setUser({
          email:response.email,
          roles: response.roles
        });


        // redirect back to home
       this.router.navigateByUrl('/');

        console.log(response);
      }
    });
  }
}
