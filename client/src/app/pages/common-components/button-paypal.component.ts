import { Component, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SharedModule } from '../../shared.module';
import {
  PaymentService,
  SubscriptionService,
} from '../../../../fastapi/services';
import { ToastService } from '../../services/toast.service';

declare var window: any;

@Component({
  selector: 'app-button-paypal',
  standalone: true,
  imports: [SharedModule],
  template: `<div id="paypal-button-container"></div>`,
  styles: [
    `
      :host {
        display: grid;
      }
    `,
  ],
})
export class ButtonPayPalComponent {
  @Input('amount') amount!: string;
  @Input('plan_id') plan_id?: string;

  constructor(
    private paymentService: PaymentService,
    private toaster: ToastService,
    private subscriptionService: SubscriptionService
  ) {}

  ngAfterViewInit() {
    console.log('plan_id:', this.plan_id);
    console.log('Amount:', this.amount);
    this.attachPayPal();
  }

  attachPayPal() {
    if (this.plan_id) {
      window.paypal
        .Buttons({
          style: {
            shape: 'rect',
            layout: 'vertical',
            color: 'gold',
            label: 'subscribe',
          },
          createSubscription: async () => {
            try {
              const plan_id = String(this.plan_id);
              const subscriptionData: any = await lastValueFrom(
                this.subscriptionService.checkoutSessionPaypalSubscription({
                  body: { plan_id },
                })
              );

              const responseData = subscriptionData.json_response;
              if (responseData.id) {
                return responseData.id;
              }

              const errorDetail = subscriptionData?.details?.[0];
              const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${subscriptionData.debug_id})`
                : JSON.stringify(subscriptionData);

              throw new Error(errorMessage);
            } catch (ex: any) {
              console.error('checkoutSessionPaypalSubscription ex:', ex);
              this.toaster.show(ex?.error?.detail || 'An error occurred.', {
                classname: 'bg-danger text-light',
              });
            }
          },
          onApprove: async (data: any, actions: any) => {
            try {
              console.log('Subscription approved:', data);
              const captureResult = await actions.subscription.get();
              console.log('Subscription capture result:', captureResult);
              this.reloadSuccess();
            } catch (ex: any) {
              console.error('Error in subscription approval:', ex);
              this.reloadFailure();
            }
          },
        })
        .render('#paypal-button-container');
    } else {
      window.paypal
        .Buttons({
          style: {
            shape: 'rect',
            layout: 'vertical',
            color: 'gold',
            label: 'paypal',
          },
          createOrder: async () => {
            try {
              const amount = Number(this.amount);
              const orderData: any = await lastValueFrom(
                this.paymentService.checkoutSessionPaypal({
                  body: { amount },
                })
              );

              const responseData = orderData.json_response;
              if (responseData.id) {
                return responseData.id;
              }

              const errorDetail = orderData?.details?.[0];
              const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                : JSON.stringify(orderData);

              throw new Error(errorMessage);
            } catch (ex: any) {
              console.error('checkoutSessionPaypal ex:', ex);
              this.toaster.show(ex?.error?.detail || 'An error occurred.', {
                classname: 'bg-danger text-light',
              });
            }
          },
          onApprove: async (data: any, actions: any) => {
            try {
              let orderData: any = await lastValueFrom(
                this.paymentService.captureOrderPaypal({
                  order_id: data.orderID,
                })
              );

              const errorDetail = orderData?.details?.[0];
              orderData = orderData.json_response;

              if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                return actions.restart();
              } else if (errorDetail) {
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData));
              } else {
                console.log(
                  'captureOrderPaypal orderData:',
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
                this.reloadSuccess();
              }
            } catch (ex: any) {
              console.error('captureOrderPaypal ex:', ex);
              this.reloadFailure();
            }
          },
        })
        .render('#paypal-button-container');
    }
  }

  reloadSuccess() {
    window.location.href =
      '/settings/billing/overview?spawnModal=payment-success';
  }

  reloadFailure() {
    window.location.href =
      '/settings/billing/overview?spawnModal=payment-failure';
  }

  guid() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
