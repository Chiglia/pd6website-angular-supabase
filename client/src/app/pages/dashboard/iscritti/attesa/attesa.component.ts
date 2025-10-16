import { Component, OnInit } from '@angular/core';
import {
  User,
  UserBranca,
  UserRole,
  UsersService,
} from '../../../../../../fastapi';
import { lastValueFrom } from 'rxjs';
import { SharedModule } from '../../../../shared.module';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-attesa',
    imports: [SharedModule, TableModule],
    templateUrl: './attesa.component.html',
    styleUrl: './attesa.component.css'
})
export class AttesaComponent implements OnInit {
  users: User[] = [];
  pendingUsers: User[] = [];
  registeredUsers: User[] = [];

  constructor(private userService: UsersService) {}

  async ngOnInit() {
    this.users = await lastValueFrom(this.userService.usersControllerFindAll());
    this.pendingUsers = this.users.filter(
      (user) => user.branca === UserBranca.PENDING
    );
    this.registeredUsers = this.users.filter(
      (user) => user.branca === UserBranca.REGISTERED
    );
  }
}
