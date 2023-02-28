import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { FileUploadComponent } from './Component/file-upload/file-upload.component';
import { ForgotPasswordComponent } from './Component/forgot-password/forgot-password.component';
import { LoginComponent } from './Component/login/login.component';

import { RegisterComponent } from './Component/register/register.component';
import { VerifyEmailComponent } from './Component/verify-email/verify-email.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'upload-files', component: FileUploadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



