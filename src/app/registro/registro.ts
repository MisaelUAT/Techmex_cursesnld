import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

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
    repetir_contrasena: ''
  };

  constructor(private auth: Auth) {}

  ngOnInit() {
    this.step_actually = 1;
  }

  step_slide_continue() {
    // Validar paso 1 antes de continuar
    if (this.step_actually === 1 && (!this.form_registro.nombre || !this.form_registro.apellidos || !this.form_registro.correo)) {
      alert('Por favor llena todos los campos antes de continuar');
      return;
    }

    this.step_actually++;
  }

  async registro_usuario() {
    if (this.form_registro.contrasena !== this.form_registro.repetir_contrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.form_registro.correo,
        this.form_registro.contrasena
      );
      console.log('✅ Usuario creado:', userCredential.user);
      alert('Usuario registrado correctamente');
      this.step_actually = 3;
    } catch (error: any) {
      console.error('❌ Error al registrar:', error);
      alert('Ocurrió un error: ' + error.message);
    }
  }
}
