import { Injectable, Inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServiceFE } from '../services/auth.service';
import { UserRole } from '../../../fastapi';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(String) private allowedRoles: UserRole[],
    private authService: AuthServiceFE,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }

    let userRole: UserRole | null = null;
    try {
      const user = await firstValueFrom(this.authService.user$.pipe(take(1)));
      console.log(user);
      if (user && user.role) {
        userRole = user.role;
      }
    } catch (error) {
      console.error('Error fetching user role', error);
    }

    if (userRole && this.allowedRoles.includes(userRole)) {
      return true;
    }
    console.log('unauthorized', userRole);
    console.log(this.allowedRoles);
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
