import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in-page/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './shared/header-component/header.component';
import { GroupsComponent } from './pages/home/components/response-component/groups.component';
import { FormsModalComponent } from './pages/home/components/response-component/modals/forms-modal/forms-modal.component';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';
import { UpdateModalComponent } from './shared/update-modal/update-modal.component';
import { QuestionsModalComponent } from './pages/home/components/response-component/modals/questions-modal/questions-modal.component';
import { GroupsCreateModalComponent } from './pages/home/components/response-component/modals/groups-create-modal/groups-create-modal.component';
import { FormsCreateModalComponent } from './pages/home/components/response-component/modals/forms-create-modal/forms-create-modal.component';
import { QuestionsCreateModalComponent } from './pages/home/components/response-component/modals/questions-create-modal/questions-create-modal.component';
import { SucessfulMessageModalComponent } from './shared/sucessful-message-modal/sucessful-message-modal.component';
import { NpsComponent } from './pages/nps-page/nps.component';
import { CheckAnswersModalComponent } from './pages/home/components/response-component/modals/check-answers-modal/check-answers-modal.component';
import { NpsChartComponent } from './pages/nps-page/components/nps-chart-component/nps-chart/nps-chart.component';
import { NpsUsersComponent } from './pages/nps-page/components/nps-users-component/nps-users/nps-users.component';
import { SignUpComponent } from './pages/sign-up-page/sign-up.component';
import { FormQuestionsPageComponent } from './pages/form-questions-page/form-questions-page.component';
import { SearchComponentComponent } from './shared/search-component/search-component.component';
import { CommonModule } from '@angular/common';
import { FormsPageComponent } from './pages/forms-page/forms-page.component';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    GroupsComponent,
    FormsModalComponent,
    DeleteModalComponent,
    UpdateModalComponent,
    QuestionsModalComponent,
    GroupsCreateModalComponent,
    FormsCreateModalComponent,
    SucessfulMessageModalComponent,
    QuestionsCreateModalComponent,
    NpsComponent,
    CheckAnswersModalComponent,
    NpsChartComponent,
    NpsUsersComponent,
    SignUpComponent,
    FormQuestionsPageComponent,
    SearchComponentComponent,
    FormsPageComponent,
    QuestionsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
