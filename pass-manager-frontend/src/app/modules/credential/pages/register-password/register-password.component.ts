import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CredentialService } from '../../services/credential.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.scss'],
})
export class RegisterPasswordComponent implements OnInit {
  form!: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private credentialService: CredentialService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      emailCredential: new FormControl(null, []),
      usernameCredential: new FormControl(null, []),
      credentialPassword: new FormControl(null, [Validators.required]),
      websiteName: new FormControl(null, []),
      websiteUrl: new FormControl(null, []),
    });
  }

  createCredential() {
    const input = this.form.getRawValue();

    Swal.fire({
      title: 'Carregando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.credentialService.register(input).subscribe(
      (response) => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Senha salva com sucesso !!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigate(['/credential/list']);
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.error,
        });
      }
    );
  }
}
