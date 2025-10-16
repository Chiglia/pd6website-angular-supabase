import { Component, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SharedModule } from '../../shared.module';
import {
  PaymentService,
  SubscriptionService,
} from '../../../../fastapi/services';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-button-stripe',
  standalone: true,
  imports: [SharedModule],
  template: `
    <button class="btn btn-primary" style="padding: 10px 5px;" (click)="pay()">
      <img src="/assets/stripe.png" alt="Stripe logo" height="22" />
    </button>
  `,
  styles: [
    `
      :host {
        display: grid;
      }

      .btn-primary {
        background: linear-gradient(98.45deg, #32325d -31.62%, #493b70 107.62%);
      }

      .btn-primary:hover {
        background: linear-gradient(98.45deg, #505095 -31.62%, #624f96 107.62%);
      }
    `,
  ],
})
export class ButtonStripeComponent {
  @Input('amount') amount!: string;
  @Input('planId') planId?: string;

  constructor(
    private paymentService: PaymentService,
    private toaster: ToastService,
    private subscriptionService: SubscriptionService
  ) {}

  addBackdrop() {
    const backdropEl = document.createElement('DIV');
    backdropEl.classList.add('backdrop-blocking-operation');
    backdropEl.style.position = 'fixed';
    backdropEl.style.zIndex = '2147483647';
    backdropEl.style.top = '0';
    backdropEl.style.left = '0';
    backdropEl.style.width = '100%';
    backdropEl.style.height = '100%';
    backdropEl.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    backdropEl.style.color = 'rgb(255, 255, 255)';
    backdropEl.style.pointerEvents = 'auto';
    backdropEl.style.display = 'grid';
    backdropEl.style.placeItems = 'center';
    const textEl = document.createElement('DIV');
    textEl.innerHTML =
      'This may take a few moments.<br>Please do not refresh your browser or click the back button.';
    textEl.style.maxWidth = '350px';
    textEl.style.textAlign = 'center';
    backdropEl.appendChild(textEl);
    document.body.appendChild(backdropEl);
  }

  removeBackdrop() {
    const backdropEl = document.querySelector('.backdrop-blocking-operation');
    if (backdropEl) {
      document.body.removeChild(backdropEl);
    }
  }

  async pay() {
    try {
      this.addBackdrop();
      let res;
      if (this.planId) {
        res = await lastValueFrom(
          this.subscriptionService.checkoutSessionStripeSubscription({
            body: { plan_id: this.planId },
          })
        );
      } else {
        res = await lastValueFrom(
          this.paymentService.checkoutSessionStripe({
            body: { amount: Number(this.amount) },
          })
        );
      }
      window.location.href = res.url;
    } catch (ex: any) {
      this.toaster.show(ex?.error?.detail || 'An error occurred.', {
        classname: 'bg-danger text-light',
      });
    } finally {
      this.removeBackdrop();
    }
  }
}
