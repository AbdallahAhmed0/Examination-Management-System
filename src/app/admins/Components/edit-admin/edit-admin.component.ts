import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from '../../Services/admins.service';
import { Admin } from './../../Models/admin';

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

  constructor(private adminService:AdminsService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private fb:FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      const id=Number(paramMap.get('id'));

      this.adminService.getAdminById(id).subscribe(data =>{
      this.admin=data;

    this.newAdmin = new FormGroup({
      firstName: new FormControl(data.firstName, [Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
      lastName: new FormControl(data.lastName, [Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
      universityId: new FormControl(data.universityId, [Validators.required]),
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      password:new FormControl(data.password,[Validators.required,Validators.minLength(6)]),
      role:new FormControl(data.roles,[Validators.required]),
      specialization:new FormControl(data.specialization,[Validators.required]),
      enable:new FormControl(true),
      locked:new FormControl(false)

    })

    // this.newAdmin = this.fb.group({
    //   firstName:[data.firstName,Validators.required, Validators.minLength(3),Validators.maxLength(20)],
    //   lastName: [data.lastName,Validators.required, Validators.minLength(3),Validators.maxLength(20)],
    //   universityId: [data.universityId,Validators.required],
    //   email: [data.email, Validators.required, Validators.email],
    //   password:[data.password,Validators.required,Validators.minLength(6)],
    //   role:[data.roles,Validators.required],
    //   specialization:[data.specialization,Validators.required],
    //   enable:[true],
    //   locked:[false]

    // })

  })
});

  }
  editAdmin(id:number){

    const observer={
      next: (admin:Admin) => {
        alert("Admin Updated Successfuly");
        this.router.navigateByUrl('/admins');
      },
      error: (err:Error)=>{alert(err.message)}
    }
    this.EditAdmin=this.newAdmin.value;
    this.EditAdmin.id=id;
    if(!(this.EditAdmin.email == this.admin.email ||
      this.EditAdmin.firstName == this.admin.firstName ||
      this.EditAdmin.lastName == this.admin.lastName ||
      this.EditAdmin.universityId == this.admin.universityId ||
      this.EditAdmin.enable == this.admin.enable
      )){


        this.adminService.updateAdmin(this.EditAdmin).subscribe(() =>{});
    console.log(this.EditAdmin);
    }
    this.goback();
  }



goback(){
  this.router.navigate(['admins'])
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
  return this.newAdmin.get('role');
}
get specialization(){
  return this.newAdmin.get('specialization');
}
get enable(){
  return this.newAdmin.get('enable');
}


}


