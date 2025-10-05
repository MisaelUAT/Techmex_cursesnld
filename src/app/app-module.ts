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
    ],
  },
];

@NgModule({
  declarations: [App, Login, Registro, Inicio, Introduccion, Header, Navbar, Footer, ConfigUsuario, NavbarOptions],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    // AngularFireModule.initializeApp({
    //   apiKey: 'AIzaSyBZhuH0PDvtAqzEiFZ6enoVLwsoAODl03k',
    //   authDomain: 'techmex-57.firebaseapp.com',
    //   projectId: 'techmex-57',
    //   storageBucket: 'techmex-57.appspot.com',
    //   messagingSenderId: '703863408934',
    //   appId: '1:703863408934:web:61c309be8e889fa6c7d9e7',
    //   measurementId: 'G-HDSY8NVSX0',
    // }),
    // AngularFirestoreModule,
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
