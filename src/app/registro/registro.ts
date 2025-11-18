import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore,setDoc,doc } from '@angular/fire/firestore';

declare var bootstrap: any;
@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
step_actually!: number;

  form_registro = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    repetir_contrasena: '',
  }

  terminos_condiciones!: false
;

  constructor(private auth: Auth,private Router:Router, private Firestore:Firestore) {}

  ngOnInit() {
    this.step_actually = 1;
  }

  step_slide_continue() {
    if (this.step_actually === 1 && (!this.form_registro.nombre || !this.form_registro.apellidos || !this.form_registro.correo || !this.terminos_condiciones)) {
      this.mostrarToast('LLena todos los campos ❌ ', 'danger');
      return;
    }

    this.step_actually++;
  }

  step_slide_atras(){
    if(this.step_actually > 0){
      this.step_actually--;
      return
    }
    else{
      this.Router.navigate(['/login'])
    }

  }

  private mostrarToast(mensaje: string, tipo: 'success' | 'danger' = 'success') {
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
      // Limpia estilos previos
      toastEl.classList.remove('bg-success', 'bg-danger');
      toastEl.classList.add(`bg-${tipo}`);

      // Inserta el mensaje
      const toastBody = toastEl.querySelector('.toast-body');
      if (toastBody) toastBody.textContent = mensaje;

      // Muestra el toast
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }


  async registro_usuario() {
    if (this.form_registro.contrasena !== this.form_registro.repetir_contrasena) {
      this.mostrarToast('Las Contraseñas no Coinciden ❌ ', 'danger');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.form_registro.correo,
        this.form_registro.contrasena
      )

      const user_create = userCredential.user

      await setDoc(doc(this.Firestore, "Usuarios", user_create.uid), {
      nombre: this.form_registro.nombre,
      apellidos: this.form_registro.apellidos,
      correo: this.form_registro.correo,
      activo: true
    });


      this.mostrarToast('Usuario Creado correctamente ✅', 'success');
      this.step_actually = 3;
    } catch (error: any) {
      console.error('❌ Error al registrar:', error);
      this.mostrarToast('Error a la hora de crear el usuario ❌ ', 'danger');
    }
  }

  
  
}
