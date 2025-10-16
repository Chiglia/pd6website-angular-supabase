import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-billing',
  imports: [SharedModule, TabsModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent {}
