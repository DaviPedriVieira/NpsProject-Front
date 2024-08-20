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
import { FormsModalComponent } from './pages/home/components/response-component/modals/forms-modal/forms-modal.component';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from './shared/update-modal/update-modal.component';
import { QuestionsModalComponent } from './pages/home/components/response-component/modals/questions-modal/questions-modal.component';
import { GroupsCreateModalComponent } from './pages/home/components/create-component/modals/groups-create-modal/groups-create-modal.component';
import { FormsCreateModalComponent } from './pages/home/components/create-component/modals/forms-create-modal/forms-create-modal.component';
import { SucessfulMessageModalComponent } from './shared/sucessful-message-modal/sucessful-message-modal.component';

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
    GroupsCreateModalComponent,
    FormsCreateModalComponent,
    SucessfulMessageModalComponent,
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
