import { Component } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { UsersService } from '../../../../../fastapi';
import { ToastService } from '../../../services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthServiceFE } from '../../../services/auth.service';

@Component({
    selector: 'app-profile',
    imports: [SharedModule, InputTextModule, CheckboxModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {
  loading = true;
  showNotification = false;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthServiceFE,
    private userService: UsersService,
    private toaster: ToastService
  ) {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      accept_newsletter: [false],
    });
  }

  async ngOnInit() {
    this.loading = false;
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue({
          firstname: user.firstName,
          lastname: user.lastName,
          address: user.address,
          phone: user.phone,
        });
      }
    });
  }

  async onSubmit() {
    try {
      this.loading = true;
      //insrt here logic
      this.showNotification = true;
    } catch (ex: any) {
      this.toaster.show(ex?.error?.detail || 'An error occurred.', {
        classname: 'bg-danger text-light',
      });
    } finally {
      this.loading = false;
    }
  }
}
