import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public account: any;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
  onLogout(){
    localStorage.removeItem('token');
  }

}
