import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CredentialService } from '../../services/credential.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Credential } from '../../models/Credential';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-credential',
  templateUrl: './edit-credential.component.html',
  styleUrls: ['./edit-credential.component.scss'],
})
export class EditCredentialComponent implements OnInit {
  form!: FormGroup;
  id: number;
  credential!: Credential;
  hide = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private credentialService: CredentialService
  ) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.initForm();
    this.credentialService.obtain(this.id).subscribe((data) => {
      this.credential = data;
      this.form.patchValue({
        emailCredential: data.emailCredential,
        usernameCredential: data.usernameCredential,
        credentialPassword: data.credentialPassword,
        websiteName: data.websiteName,
        websiteUrl: data.websiteUrl,
      });
    });
  }

  initForm() {
    this.form = new FormGroup({
      emailCredential: new FormControl(),
      usernameCredential: new FormControl(),
      credentialPassword: new FormControl(),
      websiteName: new FormControl(),
      websiteUrl: new FormControl(),
    });
  }

  updateCredential() {
    const input = this.form.getRawValue();

    Swal.fire({
      title: 'Carregando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.credentialService.update(this.id, input).subscribe(
      (response) => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Senha atualizada com sucesso !!',
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

  async deleteCredential(credential: Credential) {
    const { value: accept } = await Swal.fire({
      title: 'Excluir Senha',
      text: `Tem certeza que deseja excluir a senha para: ${credential.websiteName}`,
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    });
    if (!accept) return;
    this.credentialService.delete(this.id).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Senha deletada com sucesso !!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.router.navigate(['/credential/list']);
      });
    });
  }

  copyText(value: string) {
    navigator.clipboard.writeText(value);
  }
}
