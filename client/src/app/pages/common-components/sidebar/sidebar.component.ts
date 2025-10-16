import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthServiceFE } from '../../../services/auth.service';
import { UserRole } from '../../../../../fastapi';

@Component({
    selector: 'app-sidebar',
    imports: [SharedModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  UserRole = UserRole;
  constructor(
    public sidebarService: SidebarService,
    public authService: AuthServiceFE
  ) {}
}
