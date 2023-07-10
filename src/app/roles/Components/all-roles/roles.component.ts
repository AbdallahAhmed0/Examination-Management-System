import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../Services/roles.service';
import { Router } from '@angular/router';
import { Role } from '../../Models/role';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from '../../../Shared/material/dialog/dialog.component';
import { StorageService} from 'src/app/login/Services/storage.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  roleName!: string;
  editRoleName!: string;
  displayedColumns: string[] = ['No', 'name', 'edit', 'delete'];
  allRoles!: Role[];
  dataSource: any;
  role: Role = {} as Role;
  permissions: Object[] = [];

  constructor(
    private rolesService: RolesService,
    private router: Router,
    private dialog: MatDialog,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.permissions = this.storageService.getUser().permissions;

    if (
      this.permissions.some((role: any) => role.authority === 'MANAGE_ROLE')
    ) {
      this.getRoles();
    }
  }
  getRoles() {
    this.rolesService.getRoles().subscribe((res) => {
      this.allRoles = res;
      console.log(res)
      this.dataSource = this.allRoles;
    });
  }
  addRole() {
    this.router.navigate([`roles/add`]);
  }
  deleteRole(id: number) {
    const dialogRef = this.dialog.open(DialogeComponent, {
      width: '400px',
      height: '280px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.rolesService.deleteRole(id).subscribe((data) => {
          window.location.reload();
          this.rolesService.openSnackBar('Deleted');
        });
      }
    });
  }
  editRole(id: number) {
    this.router.navigate([`roles/edit/${id}`]);
  }
}
