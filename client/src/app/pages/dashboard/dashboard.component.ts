import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../common-components/nav/nav.component';
import { SidebarComponent } from '../common-components/sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
    selector: 'app-dashboard',
    imports: [SharedModule, RouterOutlet, NavComponent, SidebarComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public sidebarService: SidebarService) {}
}
