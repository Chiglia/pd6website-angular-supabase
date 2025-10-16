import { Injectable, TemplateRef } from '@angular/core';
// import { guid } from '../utils/uuid';

interface IToastOptions {
  classname?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: IToastOptions = {}) {
    let numero: string =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    this.toasts.push({
      textOrTpl,
      guid: numero,
      position: 'top-right',
      ...options,
    });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
