import { Component, OnInit } from '@angular/core';
import { Credential } from '../../models/Credential';
import { User } from '../../../../modules/user/models/User';
import { CredentialService } from '../../services/credential.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  credentialList: Credential[] = [];
  userId!: number;
  dropdownOpen: boolean = false;

  constructor(
    private credentialService: CredentialService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
    this.loadData();
  }

  loadData() {
    this.credentialService.list().subscribe((data: any) => {
      this.credentialList = data;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
  }
}
