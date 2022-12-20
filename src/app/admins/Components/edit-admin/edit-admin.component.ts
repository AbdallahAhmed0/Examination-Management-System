import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from '../../Services/admins.service';
import { Admin } from './../../Models/admin';
import { Role } from './../../../roles/role';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {

  hide = true;

  admin:Admin ={} as Admin;
  newAdmin!: FormGroup;
  EditAdmin!:Admin;
  checkRole:any[]=[];
  id!:number;

  roleView!:Role[];

  constructor(private adminService:AdminsService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private fb:FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.id=Number(paramMap.get('id'));

      this.adminService.getAdminById(this.id).subscribe(data =>{
      this.admin=data;
      this.roleView=this.admin.roles;
      this.checkRole=this.roleView;
      this.newAdmin = this.fb.group({
        firstName:[data.firstName,[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
        lastName: [data.lastName,[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
        universityId: [data.universityId,[Validators.required]],
        email: [data.email, [Validators.required, Validators.email]],
        password:[data.password,[Validators.required,Validators.minLength(6)]],
        roles: this.fb.array([]),
        specialization:[data.specialization,[Validators.required]],
        enable:[true],
        locked:[false]

      })

  })
});

  }
  editAdmin(){

    const observer={
      next: (admin:Admin) => {
        alert("Admin Updated Successfuly");
        this.router.navigateByUrl('/admins');
      },
      error: (err:Error)=>{alert(err.message)}
    }

    let testformArray = this.newAdmin.get('roles') as FormArray;
    for (let i of this.checkRole) {
        testformArray.push(new FormControl(i));
    }

    this.EditAdmin=this.newAdmin.value;
    this.EditAdmin.id=this.id;

        this.adminService.updateAdmin(this.EditAdmin).subscribe(() =>{});
        this.goback();
  }



goback(){
  this.router.navigate(['admins'])
}

selectedRole(role:any[]){
  this.checkRole=role;
  }


get firstName() {
  return this.newAdmin.get('firstName');
}
get lastName() {
  return this.newAdmin.get('lastName');
}
get universityId() {
  return this.newAdmin.get('universityId');
}
get email() {
  return this.newAdmin.get('email');
}
get password() {
  return this.newAdmin.get('password');
}
get role() {
  return this.newAdmin.get('roles');
}
get specialization(){
  return this.newAdmin.get('specialization');
}
get enable(){
  return this.newAdmin.get('enable');
}


}


