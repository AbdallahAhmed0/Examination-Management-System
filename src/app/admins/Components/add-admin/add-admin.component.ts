
import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminsService } from '../../Services/admins.service';
import { Admin } from './../../Models/admin';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  hide = true;

  

  newAdmin!: FormGroup;
  checkRole:any[]=[];

    constructor(private adminService:AdminsService,
              private router:Router,
              private fb:FormBuilder){

              }



  ngOnInit(): void {
    this.newAdmin = this.fb.group({
            firstName: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
            lastName:['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
            universityId: ['',[Validators.required]],
            email: ['',[Validators.required, Validators.email]],
            roles: this.fb.array([]),
            password:[''],
            specialization:['',[Validators.required]],
            enable:[true],
            locked:[false]

          })
  }
  addAdmin(){

    const observer={
      next: (admin:Admin) => {
        alert("Admin added Successfuly");
        this.router.navigateByUrl('/admins');
      },
      error: (err:Error)=>{alert(err.message)}
    }
    let testformArray = this.newAdmin.get('roles') as FormArray;
    for (let i of this.checkRole) {
        testformArray.push(new FormControl(i));
    }
    if(this.password?.value == ''){
      this.password?.setValue(`${this.firstName?.value}${this.lastName?.value}${this.universityId?.value}`);
    }
    this.adminService.addAdmin(this.newAdmin.value).subscribe(observer);
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

