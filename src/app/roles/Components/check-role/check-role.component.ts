import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Role } from '../../Models/role';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../../Services/roles.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-role',
  templateUrl: './check-role.component.html',
  styleUrls: ['./check-role.component.scss']
})
export class CheckRoleComponent implements OnInit,OnDestroy {
  allRoles:Role[]=[];
  form!:FormGroup;
  check!:any[]

  subRole?:Subscription;


  @Output()checkRole:EventEmitter<any[]>=new EventEmitter<any[]>;
  @Input()roleView:Role[]=[];
  constructor(private formBuilder: FormBuilder,
              private roleService:RolesService){

      // get Roles
      this.subRole= roleService.getRoles().subscribe(res =>{
        this.allRoles=res;
        this.check = new Array(this.allRoles.length).fill(0);
        this.updateRole()
      })

  }
  onCheckboxChange(e:any) {

    const roles: FormArray = this.form.get('role') as FormArray;



    if (e.target.checked) {

      roles.push(new FormControl(e.target.value));
    } else {

      const index = roles.controls.findIndex(x => x.value === e.target.value);
      roles.removeAt(index);
    }
    let sentRoles=[];
    let rol =this.form.value;
    for(let i = 0;i <rol.role.length ;i++){
      const index = this.allRoles.findIndex(role => role.role == rol.role[i]);
      sentRoles.push(this.allRoles[index])
    }
    this.checkRole.emit(sentRoles);
  }
  ngOnInit(): void {
    if(!this.roleView.length){
    this.form = this.formBuilder.group({
      role: this.formBuilder.array([], [Validators.required])
    })
  }else{
    this.form = this.formBuilder.group({
      role: this.formBuilder.array(this.roleView.map(role => role.role), [Validators.required])
    })
  }


    }

  get role() {
    return this.form.get('role');
  }
  updateRole(){
    for(let i = 0;i < this.roleView.length;i++){
      for(let j = 0;j<this.allRoles.length;j++) {
        if(this.allRoles[j].role == this.roleView[i].role){
          this.check[j] = 1
      }
    }
  }
}
ngOnDestroy(): void {
this.subRole?.unsubscribe();
}

}

