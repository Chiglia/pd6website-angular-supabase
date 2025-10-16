import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AuthServiceFE } from '../services/auth.service';
import { UserRole } from '../../../fastapi';

@Directive({
    selector: '[appHasRole]',
    standalone: false
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: UserRole[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthServiceFE
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      // Rimuovi l'elemento dal DOM se l'utente non ha il ruolo richiesto
      if (!user?.role || !this.appHasRole.includes(user.role)) {
        this.renderer.removeChild(
          this.el.nativeElement.parentNode,
          this.el.nativeElement
        );
      }
    });
  }
}
