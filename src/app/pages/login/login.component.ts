import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  _sub$: Subject<boolean> = new Subject();
  loginForm: FormGroup = this._fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    if (this.loginForm.invalid) return;
    this.userService
      .login(this.loginForm.value)
      .pipe(
        tap((e) => this.router.navigate(['/'])),
        takeUntil(this._sub$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._sub$.next(true);
    this._sub$.complete();
  }
}
