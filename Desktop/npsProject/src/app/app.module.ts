import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login-page/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './pages/home/components/header-component/header.component';
import { CreateComponent } from './pages/home/components/create-component/create.component';
import { ResponseComponent } from './pages/home/components/response-component/response.component';
import { FormsModalComponent } from './pages/home/components/forms-modal/forms-modal.component';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from './shared/update-modal/update-modal.component';
import { QuestionsModalComponent } from './pages/home/components/questions-modal/questions-modal-component/questions-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    CreateComponent,
    ResponseComponent,
    FormsModalComponent,
    DeleteModalComponent,
    UpdateModalComponent,
    QuestionsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
