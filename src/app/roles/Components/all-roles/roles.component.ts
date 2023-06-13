import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../Services/roles.service';
import { Router } from '@angular/router';
import { Role } from '../../Models/role';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from '../../../Shared/material/dialog/dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit  {

  roleName!:string;
  editRoleName!:string;
  displayedColumns: string[] = ['No', 'name', 'edit','delete'];
  allRoles!:Role[];
  dataSource: any ;
  role:Role={} as Role;


  constructor(private rolesService:RolesService, private router:Router,
    private dialog: MatDialog
    ) { }


  ngOnInit(): void {
    this.getRoles()
  }
  getRoles(){

    this.rolesService.getRoles().subscribe(res=>{
      this.allRoles=res
      this.dataSource=this.allRoles

    })


  }
  addRole(){
    this.router.navigate([`roles/add`])
  }
  deleteRole(id:number){
    const dialogRef = this.dialog.open(DialogeComponent, {
      width: '400px',
      height:'280px'
      });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.rolesService.deleteRole(id).subscribe((data)=>{
          window.location.reload();
          this.rolesService.openSnackBar("Deleted");
        })
        }
      });


  }
  editRole(id:number){
    this.router.navigate([`roles/edit/${id}`])

  }
}


