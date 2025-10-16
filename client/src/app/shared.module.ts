import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HasRoleDirective } from './directives/has-role.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Table } from 'primeng/table';

@NgModule({
  declarations: [HasRoleDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    ButtonModule,
  ],
  exports: [
    HasRoleDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    ButtonModule,
  ],
})
export class SharedModule {}
