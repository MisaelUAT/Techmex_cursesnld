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

const routes: Routes = [
  {path: 'login', component: Login, data: {background_class: 'bg_login'}},
  {path: 'registro', component: Registro, data: {background_class: 'bg_registro'}},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'inicio',component: Inicio,children:[
     { path: 'introduccion', component: Introduccion, outlet: 'content' }
  ]}
]

@NgModule({
  declarations: [
    App,
    Login,
    Registro,
    Inicio,
    Introduccion,
    Header,
    Navbar,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
        RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
