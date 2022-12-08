import { Component, OnChanges, OnInit } from '@angular/core';
import { RolesService } from './roles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from './role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit  {
  roleName!:string;
  displayedColumns: string[] = ['No', 'name', 'delete'];
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
    this.role.role=this.roleName;
    this.rolesService.addRole(this.role);
    alert('Added Successfully')
  }
  deleteRole(id:number){

    this.rolesService.deleteRole(id)

  }

}
