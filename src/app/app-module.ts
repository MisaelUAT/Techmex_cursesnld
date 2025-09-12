import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './login/login';
import { Registro } from './registro/registro';

const routes: Routes = [
  {path: 'login', component: Login, data: {background_class: 'bg_login'}},
  {path:'',component: Login, data: {background_class: 'bg_login'}}
]

@NgModule({
  declarations: [
    App,
    Login,
    Registro
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
