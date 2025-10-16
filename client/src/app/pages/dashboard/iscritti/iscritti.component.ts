import { Component } from '@angular/core';
import { UserBranca } from '../../../../../fastapi';
import { SharedModule } from '../../../shared.module';
import { TabsModule } from 'primeng/tabs';
import { AttesaComponent } from './attesa/attesa.component';
import { BrancheComponent } from './branche/branche.component';

@Component({
  selector: 'app-iscritti',
  imports: [SharedModule, TabsModule, AttesaComponent, BrancheComponent],
  templateUrl: './iscritti.component.html',
  styleUrl: './iscritti.component.css',
})
export class IscrittiComponent {
  UserBranca = UserBranca;
}
