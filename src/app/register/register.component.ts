import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterPayload} from './register-payload';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {LoginPayload} from '../login/login-payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  usernameTaken: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  showNameError() {
    return this.registerForm.get('name').touched && this.registerForm.get('name').invalid;
  }

  showSureNameError() {
    return this.registerForm.get('surename').touched && this.registerForm.get('surename').invalid;
  }

  showEmailError() {
    return this.registerForm.get('email').touched && this.registerForm.get('email').invalid;
  }

  showUserNameError() {
    return this.registerForm.get('username').touched && this.registerForm.get('username').invalid;
  }

  showPassowordError() {
    return this.registerForm.get('password').touched && this.registerForm.get('password').invalid;
  }

  submit() {
    console.log(this.model());
    if (this.registerForm.valid && this.controllPassword()) {

      this.authService.register(this.model()).subscribe(() => {
        console.log('register succes');
        this.authService.login(this.loginModel()).subscribe(data => {
          if (data) {
            console.log('login success');
            this.router.navigateByUrl('posts');
          } else {
            console.log('login failed');
          }
        });
      }, error => {
        this.usernameTaken = true;
        console.log(error);
      });
    }
  }

  controllPassword() {
    const password = this.registerForm.get('password').value;
    const confirmPassword = this.registerForm.get('confirmPassword').value;
    return password === confirmPassword;
  }

  private model(): RegisterPayload {
    return {
      name: this.registerForm.get('name').value,
      surename: this.registerForm.get('surename').value,
      email: this.registerForm.get('email').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      confirmPassword: this.registerForm.get('confirmPassword').value
    };
  }

  private loginModel(): LoginPayload {
    return {
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
    };
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      surename: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
}
