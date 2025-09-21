import { Component } from '@angular/core';
import { ServiceStyles } from '../servicios/service-styles';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  img_login!: HTMLImageElement;
}
