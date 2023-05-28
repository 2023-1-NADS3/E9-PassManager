import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  form!: FormGroup;
  user!: User;
  id!: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.userService.obtain(this.id).subscribe((data) => {
      this.user = data;
      this.form.patchValue({
        username: data.username,
        email: data.email,
      });
    });
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
    });
  }

  async deleteUser(user: User) {
    const { value: accept } = await Swal.fire({
      title: 'Exclusão de perfil',
      text: `Tem certeza que deseja excluir seu perfil, ${user.username} ?`,
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    });
    if (!accept) return;
    this.userService.delete(this.id).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: 'usuário deletado com sucesso !!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.authService.logout();
        this.router.navigate(['/auth/sign-in']);
      });
    });
  }

  updateUser() {
    const input = this.form.getRawValue();
    this.userService.update(this.id, input).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'usuário atualizado com sucesso !!',
          showConfirmButton: false,
          timer: 1500,
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
