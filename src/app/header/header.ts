import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  usuario_activo: boolean = false;
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.usuario_activo = !!user;
    });
  }

  async logout() {
    try {
      await signOut(this.auth);

      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('❌ Error al cerrar sesión:', error.message);
    }
  }
}
