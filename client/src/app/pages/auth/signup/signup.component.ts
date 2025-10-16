import { Component } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import {
  NonNullableFormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import {
  AuthService,
  CreateUserDto,
  RegisterUserDto,
} from '../../../../../fastapi';
import { lastValueFrom } from 'rxjs';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'app-signup',
    imports: [SharedModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formStep1: FormGroup;
  formStep2: FormGroup;
  formStep3: FormGroup;
  activeTab: number = 1;
  showNotification = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private toaster: ToastService
  ) {
    this.formStep1 = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.matchEmails }
    );

    this.formStep2 = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      dob: ['', Validators.required],
    });

    this.formStep3 = this.fb.group({
      acceptPrivacy: [false, Validators.requiredTrue],
      subscribeNewsletter: [false],
    });
  }

  matchEmails: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const group = control as FormGroup;
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    return email === confirmEmail ? null : { emailsMismatch: true };
  };

  nextStep() {
    if (this.activeTab < 3) {
      this.activeTab++;
    }
  }

  previousStep() {
    if (this.activeTab > 1) {
      this.activeTab--;
    }
  }

  async submit() {
    try {
      const userSignUp: RegisterUserDto = {
        email: this.formStep1.get('email')!.value,
        firstName: this.formStep2.get('firstName')!.value,
        lastName: this.formStep2.get('lastName')!.value,
        password: this.formStep1.get('password')!.value,
        address: this.formStep2.get('address')?.value,
        phone: this.formStep2.get('phoneNumber')?.value,
        dob: this.formStep2.get('dob')?.value,
      };
      console.log(userSignUp);

      const response = await lastValueFrom(
        this.authService.authControllerRegister(userSignUp)
      );
      console.log(response);
      this.showNotification = true;
    } catch (ex: any) {
      this.toaster.show(ex?.error?.detail || 'An error occurred.', {
        classname: 'bg-danger text-light',
      });
    }
  }
}
