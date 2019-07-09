import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        AngularFireAuthModule,
        FormsModule,
        CommonModule,
        RouterModule


    ]
})
export class AuthModule{}