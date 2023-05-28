import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditProfileComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
