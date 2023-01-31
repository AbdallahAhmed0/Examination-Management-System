import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../Services/roles.service';
import { Role } from './../../Models/role';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  roleEdit:Role={} as Role;
  role:Role={} as Role;
  editRoleName!:string;
  constructor(private rolesService:RolesService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      const id=Number(paramMap.get('id'));
      this.role.id=id;
      this.rolesService.getRoleByID(id).subscribe(data =>{
        this.roleEdit=data;
        })
      });

  }

  save(){
    this.role.role=this.editRoleName;
    this.rolesService.updateRole(this.role);

    this.goback();

  }
  goback(){
    this.router.navigate(['roles']);
  }
}
