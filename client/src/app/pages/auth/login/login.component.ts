import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { ToastService } from '../../../services/toast.service';
import { AuthServiceFE } from '../../../services/auth.service';
import { AuthService, LoginUserDto } from '../../../../../fastapi';

@Component({
    selector: 'app-login',
    imports: [SharedModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authServiceFE: AuthServiceFE,
    private router: Router,
    private toaster: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  async onSubmit() {
    try {
      this.loading = true;
      const loginDto: LoginUserDto = this.loginForm.value;
      const response = await lastValueFrom(
        this.authService.authControllerLogin(loginDto)
      );
      const auth_token = response.auth_token;

      await this.authServiceFE.setSession(auth_token);
      await new Promise((resolve) => setTimeout(resolve, 50));
      await this.router.navigateByUrl('/dashboard');
    } catch (ex: any) {
      console.log(ex);
      this.toaster.show(ex?.error?.detail || 'An error occurred.', {
        classname: 'bg-danger text-light',
      });
    } finally {
      this.loading = false;
    }
  }
}
