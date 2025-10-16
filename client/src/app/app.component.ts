import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarService } from './services/sidebar.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private sidebarService: SidebarService) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.startsWith('/home')) {
          this.sidebarService.closeSidebar();
        }
        if (event.url.startsWith('/dashboard')) {
          this.sidebarService.openSidebar();
        }
      });
  }
}
{
}
