import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in-page/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardGuard } from './guards/auth-guard/auth.guard';
import { NpsComponent } from './pages/nps-page/nps.component';
import { AuthorizeGuard } from './guards/authorize-guard/authorize.guard';
import { SignUpComponent } from './pages/sign-up-page/sign-up.component';
import { FormsPageComponent } from './pages/forms-page/forms-page.component';

const routes: Routes = [
  {path: 'signIn', component: SignInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard]},
  {path: 'nps', component: NpsComponent, canActivate: [AuthorizeGuard]},
  {path: 'form/:id', component: FormsPageComponent, canActivate: [AuthorizeGuard]},
  {path: '**', redirectTo: 'signIn'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
