import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { RegisterPasswordComponent } from './pages/register-password/register-password.component';
import { EditCredentialComponent } from './pages/edit-credential/edit-credential.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditCredentialComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CredentialRoutingModule {}
