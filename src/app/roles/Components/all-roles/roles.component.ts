import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../Services/roles.service';
import { Router } from '@angular/router';
import { Role } from '../../Models/role';

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


  constructor(private rolesService:RolesService, private router:Router) { }


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
  this.rolesService.deleteRole(id);

  }
  editRole(id:number){
    this.router.navigate([`roles/edit/${id}`])

  }
}


