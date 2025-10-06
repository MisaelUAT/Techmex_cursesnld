import { Component } from '@angular/core';
import { ConfigUser } from '../servicios/config-user';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
 coleccion = 'Usuarios';
registros: any[] = [];
 constructor(private crud: ConfigUser){}

  ngOnInit(): void{
  
  }
}
