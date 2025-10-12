import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { Inicio } from './inicio/inicio';
import { Introduccion } from './inicio/introduccion/introduccion';
import { Header } from './header/header';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { ConfigUser } from './servicios/config-user';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ConfigUsuario } from './inicio/config-usuario/config-usuario';
import { NavbarOptions } from './inicio/config-usuario/navbar-options/navbar-options';
import { ConfigInfoPerfil } from './inicio/config-usuario/config-info-perfil/config-info-perfil';
import { FormsModule } from '@angular/forms';
import { CentroAyuda } from './inicio/centro-ayuda/centro-ayuda';
import { PlanesSuscripcion } from './inicio/planes-suscripcion/planes-suscripcion';

const firebaseConfig = {
  apiKey: 'AIzaSyBZhuH0PDvtAqzEiFZ6enoVLwsoAODl03k',
  authDomain: 'techmex-57.firebaseapp.com',
  projectId: 'techmex-57',
  storageBucket: 'techmex-57.appspot.com',
  messagingSenderId: '703863408934',
  appId: '1:703863408934:web:61c309be8e889fa6c7d9e7',
  measurementId: 'G-HDSY8NVSX0',
};

const routes: Routes = [
  { path: 'login', component: Login, data: { background_class: 'bg_login' } },
  { path: 'registro', component: Registro, data: { background_class: 'bg_registro' } },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'inicio',
    component: Inicio,
    children: [
      { path: 'introduccion', component: Introduccion, outlet: 'content' },
      { path: 'configuracion_usuario', component: ConfigUsuario, outlet: 'content' },
      { path: 'centro-ayuda', component: CentroAyuda, outlet: 'content' },
      { path: 'planes-suscripcion', component: PlanesSuscripcion, outlet: 'content' },

    ],
  },
  {
    path: 'configUser',
    component: ConfigUsuario,
    children: [
      { path: 'informacion_perfil', component: ConfigInfoPerfil, outlet: 'content_configuser' },
    ],
  },
];

@NgModule({
  declarations: [App, Login, Registro, Inicio, Introduccion, Header, Navbar, Footer, ConfigUsuario, NavbarOptions, ConfigInfoPerfil, CentroAyuda, PlanesSuscripcion],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    ConfigUser,
  ],
  bootstrap: [App],
})
export class AppModule {}
