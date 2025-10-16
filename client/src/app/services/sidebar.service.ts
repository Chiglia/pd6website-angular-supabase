import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(true);
  isLeftSidebarOpen$ = this.isSidebarOpenSubject.asObservable();

  toggleSidebar() {
    this.isSidebarOpenSubject.next(!this.isSidebarOpenSubject.value);
  }

  closeSidebar() {
    this.isSidebarOpenSubject.next(true);
  }
  openSidebar() {
    this.isSidebarOpenSubject.next(false);
  }
}
