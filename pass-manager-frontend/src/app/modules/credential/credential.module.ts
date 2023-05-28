import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialRoutingModule } from './credential-routing.module';
import { ListComponent } from './pages/list/list.component';
import { RegisterPasswordComponent } from './pages/register-password/register-password.component';
import { EditCredentialComponent } from './pages/edit-credential/edit-credential.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ListComponent,
    RegisterPasswordComponent,
    EditCredentialComponent,
  ],
  imports: [
    CommonModule,
    CredentialRoutingModule,
    SharedModule,
    AuthModule,
    HttpClientModule,
  ],
})
export class CredentialModule {}
