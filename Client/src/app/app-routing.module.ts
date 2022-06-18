import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { BlogAppComponent } from './blog-app/blog-app.component';

const routes: Routes = [
  {
  path:'home-page',
  component: HomePageComponent 
  },
  {
    path:'',
    component: HomePageComponent 
    },

  {
    path:'dashboard',
    component: DashboardComponent 
    },

    {
      path:'registration',
      component: RegistrationComponent
      },

      {
        path:'login',
        component: LoginComponent
        },

        {
          path:'blog-app',
          component: BlogAppComponent
          },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
