import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  step_actually !: number;

  ngOnInit(){
    this.step_actually = 1;
  }

  step_slide_continue(){

    this.step_actually ++;
  }

}
