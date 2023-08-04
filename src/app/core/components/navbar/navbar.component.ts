import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from 'src/app/features/auth/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user?: User;
  constructor(private authService:AuthService,private router : Router) { }

  ngOnInit() {
    this.authService.user()
    .subscribe({
      next : (response)=>{
        this.user = response;
        console.log(response);
      }
    });
   this.user = this.authService.getUser();
  }
  onlogout():void
  {
this.authService.logout();
this.router.navigateByUrl('/');
  }
}
