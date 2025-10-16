import { Component } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { AvatarModule } from 'primeng/avatar';
import { AuthServiceFE } from '../../../services/auth.service';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-user-dashboard',
    imports: [SharedModule, AvatarModule, DividerModule],
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  constructor(public authService: AuthServiceFE) {}
}
