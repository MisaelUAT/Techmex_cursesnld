import { Component } from '@angular/core';
import { ServiceStyles } from '../servicios/service-styles';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  img_login!: HTMLImageElement;
  form = {
    correo: '',
    contrasena: '',
    terminos_condiciones: false,
  };

 

  constructor(private auth: Auth, private router: Router) {}
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

  async onLogin() {
    console.log(this.form.correo)
    console.log(this.form.contrasena)
    console.log(this.form.terminos_condiciones)
      if (
        !this.form.correo.trim() ||
        !this.form.contrasena.trim() ||
        !this.form.terminos_condiciones
      ) {
        this.mostrarToast('Llena todos los campos que se te piden ❌ ', 'danger');
        return;
      } 
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        this.form.correo,
        this.form.contrasena
      );
      console.log('✅ Usuario autenticado:', userCredential.user);
      this.mostrarToast('Inicio de sesión correctamente ✅', 'success');
      setTimeout(() => this.router.navigate(['/inicio']), 2000);
    } catch (error: any) {
      console.error('❌ Error al iniciar sesión:', error.message);
      this.mostrarToast('Correo o contraseña incorrectos ❌', 'danger');
    }
  }
}
