import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Role } from './../../../roles/role';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesService } from 'src/app/roles/roles.service';

@Component({
  selector: 'app-check-role',
  templateUrl: './check-role.component.html',
  styleUrls: ['./check-role.component.scss']
})
export class CheckRoleComponent implements OnInit {
  allRoles!:Role[];
  form!:FormGroup;

  @Output()checkRole:EventEmitter<any[]>=new EventEmitter<any[]>;
  @Input()roleView:Role[]=[];
  constructor(private formBuilder: FormBuilder,
              private roleService:RolesService){

      // get Roles
      roleService.getRoles().subscribe(res =>{
        this.allRoles=res;
      })



    this.form = this.formBuilder.group({

      role: this.formBuilder.array([], [Validators.required])
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
     if(this.roleView.length > 0){
    this.form = this.formBuilder.group({

      role: this.formBuilder.array(this.roleView.map(role => role.role), [Validators.required])
    })
  }
  }
  get role() {
    return this.form.get('role');
  }
}

