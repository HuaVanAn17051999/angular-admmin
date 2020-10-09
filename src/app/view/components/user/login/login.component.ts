import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
       username: [
         "",
         Validators.compose([
           Validators.required,
           Validators.maxLength(25),
          
         ])
       ],
       password: [
         "",
         Validators.compose([
           Validators.required,
          //  Validators.minLength(6),  
          //  Validators.pattern('^[a-z][0-9]+$')
         ])
       ]
    });
  }
  onSubmit() {
      return this.auth.login(this.loginForm.value).subscribe(res => {
          localStorage.setItem('token', JSON.stringify(res) );
          this.router.navigate(['/dashboard']);
      });
  }
  
}
