import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmailConfirmationComponent } from './pages/auth/email-confirmation/email-confirmation.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { HomepageComponent } from './pages/dashboard/home/homepage/homepage.component';
import { HistoryComponent } from './pages/dashboard/home/history/history.component';
import { EnciclopediaComponent } from './pages/dashboard/home/enciclopedia/enciclopedia.component';
import { BillingComponent } from './pages/dashboard/billing/billing.component';
import { BillingOverviewComponent } from './pages/dashboard/billing/billing-overview/billing-overview.component';
import { BillingHistoryComponent } from './pages/dashboard/billing/billing-history/billing-history.component';
import { UserDashboardComponent } from './pages/dashboard/user-dashboard/user-dashboard.component';
import { SchedaMedicaComponent } from './pages/dashboard/scheda-medica/scheda-medica.component';
import { FotoComponent } from './pages/dashboard/home/foto/foto.component';
import { IscrittiComponent } from './pages/dashboard/iscritti/iscritti.component';
import { AttesaComponent } from './pages/dashboard/iscritti/attesa/attesa.component';
import { BrancheComponent } from './pages/dashboard/iscritti/branche/branche.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'storia', component: HistoryComponent },
      { path: 'enciclopedia', component: EnciclopediaComponent },
      { path: 'foto', component: FotoComponent, canActivate: ['guardGuest'] },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: ['guardPreGuest'],
    children: [
      { path: '', component: UserDashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'scheda-medica', component: SchedaMedicaComponent },
      {
        path: 'billing',
        component: BillingComponent,
        children: [
          { path: '', component: BillingOverviewComponent },
          { path: 'history', component: BillingHistoryComponent },
        ],
      },
      {
        path: 'iscritti',
        component: IscrittiComponent,
        canActivate: ['guardAdmin'],
        children: [
          { path: 'attesa', component: AttesaComponent },
          { path: 'branca/:brancaType', component: BrancheComponent },
        ],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:resetCode', component: ResetPasswordComponent },
      {
        path: 'email-confirmation/:userId',
        component: EmailConfirmationComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
