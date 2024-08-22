import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login-page/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardGuard } from './guards/auth.guard';
import { NpsComponent } from './pages/nps-page/nps.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard]},
  {path: 'nps', component: NpsComponent, canActivate: [AuthGuardGuard]},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
