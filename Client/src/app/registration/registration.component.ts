import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;



  constructor
  (
    private formBuilder: FormBuilder,
    private authService:AuthService
    ) {

    this.createForm();
  }
  createForm() {
    this.form = this.formBuilder.group({
      email: '',
      username: '',
      password: '',
      confirm: ''
    })
  }
  onRegisterSubmit() {
    const user={
    email :this.form.get('email')?.value,
    username :this.form.get('username')?.value,
    password : this.form.get('password')?.value
  }

  this.authService.registerUser(user).subscribe(data=>
    {
      console.log(data);
    })
  }
  ngOnInit(): void {
  }

}
