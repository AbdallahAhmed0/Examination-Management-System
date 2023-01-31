import { Component, OnChanges, OnInit } from '@angular/core';
import { RolesService } from '../../Services/roles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../Models/role';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../../material/dialog/dialog.component';

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


  constructor(private rolesService:RolesService, private router:Router,public dialog: MatDialog) { }


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
    // this.openDialog()
   this.rolesService.deleteRole(id)

  }
  editRole(id:number){
    this.router.navigate([`roles/edit/${id}`])

  }



  openDialog() {
    this.dialog.open(DialogComponent);
  }
}


