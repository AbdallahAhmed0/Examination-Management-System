import { Component, OnInit } from '@angular/core';

import { Role } from '../../Models/role';
import { RolesService } from '../../Services/roles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  roleName!:string;


  role:Role={} as Role;


  constructor(private rolesService:RolesService, private router:Router) { }


  ngOnInit(): void {
  }
  addRole(){
    this.role.role=this.roleName;
    this.rolesService.addRole(this.role);
    this.goback()
  }
  goback(){
    this.router.navigate(['roles']);
  }

}
