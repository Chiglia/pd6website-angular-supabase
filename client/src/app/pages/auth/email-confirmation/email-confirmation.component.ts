import { Component } from '@angular/core';
import { AuthService } from '../../../../../fastapi';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SharedModule } from '../../../shared.module';

@Component({
    selector: 'app-email-confirmation',
    imports: [SharedModule],
    templateUrl: './email-confirmation.component.html',
    styleUrl: './email-confirmation.component.css'
})
export class EmailConfirmationComponent {
  loading = true;
  inError = false;
  countdown = 5;
  interval: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');

    if (!userId) {
      this.loading = false;
      this.inError = true;
      return;
    }

    try {
      await lastValueFrom(this.authService.authControllerVerifyEmail(userId));

      this.interval = setInterval(() => {
        this.countdown = Math.max(0, this.countdown - 1);
        if (this.countdown === 0) {
          clearInterval(this.interval);
          this.router.navigate(['/auth/login']);
        }
      }, 1000);
    } catch (ex: any) {
      this.inError = true;
    } finally {
      this.loading = false;
    }
  }
}
