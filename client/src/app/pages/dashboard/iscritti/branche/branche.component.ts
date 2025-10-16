import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  User,
  UserBranca,
  UserRole,
  UsersService,
} from '../../../../../../fastapi';
import { lastValueFrom } from 'rxjs';
import { Table, TableModule } from 'primeng/table';
import { SharedModule } from '../../../../shared.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-branche',
  providers: [ConfirmationService, MessageService],
  imports: [
    SharedModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    TagModule,
    TextareaModule,
  ],
  templateUrl: './branche.component.html',
  styleUrl: './branche.component.css',
})
export class BrancheComponent implements OnInit {
  @Input() brancaType!: UserBranca;
  //   users: User[] = [];
  //   filteredUsers: User[] = [];
  //   selectedUsers: User[] = [];
  //   userDialog: boolean = false;
  //   user: User = {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: '',
  //     address: '',
  //     phone: '',
  //     dob: '',
  //     role: UserRole.PREGUEST,
  //     branca: UserBranca.PENDING,
  //     has_confirmed_email: false,
  //   };
  //   submitted: boolean = false;

  //   constructor(private userService: UsersService) {}

  //   async ngOnInit() {
  //     this.users = await lastValueFrom(this.userService.usersControllerFindAll());

  //     this.filteredUsers = this.users.filter((user) => {
  //       if (this.brancaType === UserBranca.COCA) {
  //         return user.role === UserRole.ADMIN || user.role === UserRole.OWNER;
  //       } else {
  //         return (
  //           user.branca === this.brancaType &&
  //           user.role !== UserRole.ADMIN &&
  //           user.role !== UserRole.OWNER
  //         );
  //       }
  //     });
  //   }

  //   openNewUser() {
  //     // this.user = {};
  //     this.submitted = false;
  //     this.userDialog = true;
  //   }

  //   editUser(user: User) {
  //     this.user = { ...user };
  //     this.userDialog = true;
  //   }

  //   saveUser() {
  //     this.submitted = true;
  //     if (this.user.firstName && this.user.email) {
  //       // Logica per salvare l'utente
  //       this.userDialog = false;
  //     }
  //   }

  //   deleteUser(user: User) {
  //     // Logica per eliminare singolo utente
  //   }

  //   deleteSelectedUsers() {
  //     // Logica per eliminare utenti selezionati
  //   }

  //   hideDialog() {
  //     this.userDialog = false;
  //     this.submitted = false;
  //   }

  //   downloadCSV() {
  //     const csvData = this.filteredUsers.map((user) => ({
  //       Nome: `${user.firstName} ${user.lastName}`,
  //       Email: user.email,
  //       Telefono: user.phone,
  //       Indirizzo: user.address,
  //     }));

  //     const csvContent =
  //       'data:text/csv;charset=utf-8,' +
  //       [
  //         Object.keys(csvData[0]).join(','),
  //         ...csvData.map((row) => Object.values(row).join(',')),
  //       ].join('\n');

  //     const encodedUri = encodeURI(csvContent);
  //     const link = document.createElement('a');
  //     link.setAttribute('href', encodedUri);
  //     link.setAttribute('download', `${this.brancaType}-users.csv`);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  //   onFilterGlobal(event: Event) {
  //     const inputValue = (event.target as HTMLInputElement)?.value || '';
  //     this.dt.filterGlobal(inputValue, 'contains');
  //   }
  // }

  allUsers!: User[];

  users!: User[];
  statuses!: SelectItem[];

  clonedProducts: { [s: string]: User } = {};

  constructor(
    private usersService: UsersService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.allUsers = await lastValueFrom(
      this.usersService.usersControllerFindAll()
    );
    console.log(this.allUsers);
    this.users = this.allUsers.filter((user) => {
      if (this.brancaType === UserBranca.COCA) {
        return user.role === UserRole.ADMIN || user.role === UserRole.OWNER;
      } else {
        return (
          user.branca === this.brancaType &&
          user.role !== UserRole.ADMIN &&
          user.role !== UserRole.OWNER
        );
      }
    });

    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' },
    ];
  }

  onRowEditInit(user: User) {
    this.clonedProducts[user.firstName as string] = { ...user };
  }

  onRowEditSave(user: User) {
    delete this.clonedProducts[user.firstName as string];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${user.firstName + ' ' + user.lastName} is updated`,
    });
  }

  onRowEditCancel(user: User, index: number) {
    this.users[index] = this.clonedProducts[user.firstName as string];
    delete this.clonedProducts[user.firstName as string];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'danger';
    }
  }
}
