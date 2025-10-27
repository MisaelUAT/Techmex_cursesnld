import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword,signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(
    private auth: Auth,
    private router: Router,
  ){}
   async logout() {
    try {
      await signOut(this.auth);
      
      this.router.navigate(['/login']); 
    } catch (error: any) {
      console.error('❌ Error al cerrar sesión:', error.message);
    }
  }
}
