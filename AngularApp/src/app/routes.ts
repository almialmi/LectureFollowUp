import { Routes } from '@angular/router';
import { SuperuserComponent } from './superuser/superusersignin/superuser.component';
import { RegistorComponent } from './superuser/registor/registor.component';
import { HomeComponent } from './superuser/home/home.component';
import { ShowComponent } from './superuser/show/show.component';
import {UpdatePasswordComponent} from './superuser/update-password/update-password.component'
import {AuthGuard} from './auth/auth.guard';
import {RegistorsubComponent} from './subAdmin/registorsub/registorsub.component';
import { ShowsubComponent } from './subAdmin/showsub/showsub.component';
import {HomesubComponent} from './subAdmin/homesub/homesub.component';
import { UpdateProfileComponent } from './subAdmin/update-profile/update-profile.component'

import { HomesubsubComponent } from './subsubAdmin/homesubsub/homesubsub.component';
import { RegistorsubsubComponent } from './subsubAdmin/registorsubsub/registorsubsub.component';
import { ShowsubsubComponent } from './subsubAdmin/showsubsub/showsubsub.component';
import {UpdateProfilesubsubComponent} from './subsubAdmin/update-profilesubsub/update-profilesubsub.component';


import { CheckerhomeComponent } from './checker/checkerhome/checkerhome.component';
import {  CheckershowComponent } from './checker/checkershow/checkershow.component';
import { CheckersearchComponent } from './checker/checkersearch/checkersearch.component';
import {UpdateProfileCheckerComponent} from './checker/update-profile-checker/update-profile-checker.component'
import { AboutusComponent } from './superuser/aboutus/aboutus.component';
import { ContactusComponent } from './superuser/contactus/contactus.component';
import { AboutussubComponent } from './subAdmin/aboutussub/aboutussub.component';
import { ContactussubComponent } from './subAdmin/contactussub/contactussub.component';
import { AboutussubsubComponent } from './subsubAdmin/aboutussubsub/aboutussubsub.component';
import { ContactsubsubComponent } from './subsubAdmin/contactsubsub/contactsubsub.component';
import { AboutcheckerComponent } from './checker/aboutchecker/aboutchecker.component';
import { ContactcheckerComponent } from './checker/contactchecker/contactchecker.component';



export const appRoutes : Routes = [
   
    {
        path : "login" , component : SuperuserComponent,
       // children : [{path : '' , component : RegistorComponent }]
    },
    

    {
        path : "home" , component : HomeComponent, canActivate:[AuthGuard]
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path : "show" , component : ShowComponent, canActivate:[AuthGuard]
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path : "subAdminRegister" , component : RegistorComponent, canActivate:[AuthGuard]
       
    },
    {
        path:"updateProfile" , component:UpdatePasswordComponent,canActivate:[AuthGuard]

    },
    {
        path : "homesub" , component : HomesubComponent, canActivate:[AuthGuard]
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path : "registorsub" , component : RegistorsubComponent, canActivate:[AuthGuard]
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path : "showsub" , component : ShowsubComponent, canActivate:[AuthGuard]
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path: "updateProfileSub", component: UpdateProfileComponent, canActivate:[AuthGuard]

    },
    {
        path : "homesubsub" , component : HomesubsubComponent, canActivate:[AuthGuard]
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path : "registorsubsub" , component : RegistorsubsubComponent, canActivate:[AuthGuard]
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path : "showsubsub" , component : ShowsubsubComponent, canActivate:[AuthGuard]
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path:"updateProfileSubsub",component:UpdateProfilesubsubComponent,canActivate:[AuthGuard]
    },

    

    //routing for a checker
    {
        path : "homechecker" , component : CheckerhomeComponent, canActivate:[AuthGuard]
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path : "showchecker" , component : CheckershowComponent, canActivate:[AuthGuard]
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path : "checkersearch/:firstName/:middleName/:lastName" , component : CheckersearchComponent
       // children : [{path : '' , component : RegistorComponent }]
    },
    {
        path: "updateProfileChecker" , component:UpdateProfileCheckerComponent,canActivate:[AuthGuard]
    },
    {
        path: "aboutus" , component:AboutusComponent, canActivate:[AuthGuard]
    },
    {
        path: "contactus" , component:ContactusComponent, canActivate:[AuthGuard]
    },
    {
        path: "aboutussub" , component:AboutussubComponent, canActivate:[AuthGuard]
    },
    {
        path: "contactussub" , component:ContactussubComponent, canActivate:[AuthGuard]
    },
    {
        path: "aboutussubsub" , component:AboutussubsubComponent, canActivate:[AuthGuard]
    },
    {
        path: "contactussubsub" , component:ContactsubsubComponent, canActivate:[AuthGuard]
    },
    {
        path: "aboutuschecker" , component:AboutcheckerComponent, canActivate:[AuthGuard]
    },
    {
        path: "contactuschecker" , component:ContactcheckerComponent, canActivate:[AuthGuard]
    },
    

    {
        path: '',redirectTo: '/login' , pathMatch : 'full'
    }
];