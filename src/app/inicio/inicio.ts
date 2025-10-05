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
   this.crud.Read_Coleccion(this.coleccion).subscribe({
      next: (response) => {
        this.registros = response;
        console.log(this.registros);
      },
      error: (err) => console.error('Error al leer la colección:', err)
    });
  }
}
