import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperuserComponent } from './superuser/superusersignin/superuser.component';
import { ForgotpasswordComponent } from './superuser/forgotpassword/forgotpassword.component';
import { RegistorComponent } from './superuser/registor/registor.component';
import { ShowComponent } from './superuser/show/show.component';
import { HomeComponent } from './superuser/home/home.component';
import {  SubAdminService } from 'src/app/sharedsub/sub-admin.service';
import {SubsubAdminService} from 'src/app/sharedsubsub/subsub-admin.service';



import { appRoutes } from './routes';
import { SuperuserService } from './shared/superuser.service';
import {AuthGuard} from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ShowsubComponent} from './subAdmin/showsub/showsub.component';
import {  RegistorsubComponent } from './subAdmin/registorsub/registorsub.component';
import { HomesubComponent } from './subAdmin/homesub/homesub.component';
import {MatIconModule} from '@angular/material/icon';


//import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowsubsubComponent } from './subsubAdmin/showsubsub/showsubsub.component';
import { RegistorsubsubComponent } from './subsubAdmin/registorsubsub/registorsubsub.component';
import { HomesubsubComponent } from './subsubAdmin/homesubsub/homesubsub.component';



import { CheckerhomeComponent } from './checker/checkerhome/checkerhome.component';
import { CheckershowComponent } from './checker/checkershow/checkershow.component';
import {CheckerService} from 'src/app/sharedcheck/checker.service';
import { CheckersearchComponent } from './checker/checkersearch/checkersearch.component';
import { UpdatePasswordComponent } from './superuser/update-password/update-password.component';
import { UpdateProfileComponent } from './subAdmin/update-profile/update-profile.component';
import { UpdateProfileCheckerComponent } from './checker/update-profile-checker/update-profile-checker.component';
import { UpdateProfilesubsubComponent } from './subsubAdmin/update-profilesubsub/update-profilesubsub.component';
import { AboutusComponent } from './superuser/aboutus/aboutus.component';
import { ContactusComponent } from './superuser/contactus/contactus.component';
import { HeaderComponent } from './shared/componets/header/header.component';
import { FooterComponent } from './shared/componets/footer/footer.component';
import { HeadersubComponent } from './sharedsub/componets/headersub/headersub.component';
import { AboutussubComponent } from './subAdmin/aboutussub/aboutussub.component';
import { ContactussubComponent } from './subAdmin/contactussub/contactussub.component';
import { AboutComponent } from './shared/componets/about/about.component';
import { ContactComponent } from './shared/componets/contact/contact.component';
import { HeadersubsubComponent } from './sharedsubsub/componets/headersubsub/headersubsub.component';
import { AboutussubsubComponent } from './subsubAdmin/aboutussubsub/aboutussubsub.component';
import { ContactsubsubComponent } from './subsubAdmin/contactsubsub/contactsubsub.component';
import { HeadercheckerComponent } from './sharedcheck/componets/headerchecker/headerchecker.component';
import { AboutcheckerComponent } from './checker/aboutchecker/aboutchecker.component';
import { ContactcheckerComponent } from './checker/contactchecker/contactchecker.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';



@NgModule({
  declarations: [
    AppComponent,
    SuperuserComponent,
    ForgotpasswordComponent,
    RegistorComponent,
    ShowComponent,
    HomeComponent,
    ShowsubComponent,
    RegistorsubComponent,
    HomesubComponent,
    ShowsubsubComponent,
    RegistorsubsubComponent,
    HomesubsubComponent,
   
    
    
    CheckerhomeComponent,
    CheckershowComponent,
    CheckersearchComponent,
    UpdatePasswordComponent,
    UpdateProfileComponent,
    UpdateProfileCheckerComponent,
    UpdateProfilesubsubComponent,
    AboutusComponent,
    ContactusComponent,
    HeaderComponent,
    FooterComponent,
    HeadersubComponent,
    AboutussubComponent,
    ContactussubComponent,
    AboutComponent,
    ContactComponent,
    HeadersubsubComponent,
    AboutussubsubComponent,
    ContactsubsubComponent,
    HeadercheckerComponent,
    AboutcheckerComponent,
    ContactcheckerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    //ReactiveFormsModule,
    
    NgbModule,
    MatIconModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),

  ],
  providers: [ {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi : true
  },AuthGuard ,SuperuserService , SubAdminService , SubsubAdminService, CheckerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
