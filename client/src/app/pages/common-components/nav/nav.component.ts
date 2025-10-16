import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthServiceFE } from '../../../services/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-nav',
  imports: [SharedModule, MenubarModule, AvatarModule, PopoverModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  items: MenuItem[] | undefined;
  constructor(
    public sidebarService: SidebarService,
    public authService: AuthServiceFE,
    private router: Router
  ) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'bi bi-house',
        command: () => {
          this.router.navigate(['/home']);
        },
      },
      {
        label: 'Storia',
        icon: 'bi bi-hourglass-split',
        command: () => {
          this.router.navigate(['/home/storia']);
        },
      },
      {
        label: 'Enciclopedia',
        icon: 'bi bi-book',
        command: () => {
          this.router.navigate(['/home/enciclopedia']);
        },
      },
      {
        label: 'Foto',
        icon: 'bi bi-camera',
        command: () => {
          this.router.navigate(['/home/foto']);
        },
      },
    ];
  }
  // {
  //   label: 'Router',
  //   icon: 'pi pi-palette',
  //   items: [
  //     {
  //       label: 'Storia',
  //       route: '/home/history',
  //     },
  //     {
  //       label: 'Configuration',
  //       route: '/configuration',
  //     },
  //   ],
  // },
  // {
  //   label: 'External',
  //   icon: 'pi pi-home',
  //   items: [
  //     {
  //       label: 'Angular',
  //       url: 'https://angular.io/',
  //     },
  //     {
  //       label: 'Vite.js',
  //       url: 'https://vitejs.dev/',
  //     },
  //   ],
  // },
  onLogout() {
    this.authService.cleanLocalStorage();
    this.router.navigate(['/home']);
  }
  toggleTheme() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('my-app-dark');
    }
  }
}
