import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { RolesService } from 'src/app/roles/roles.service';
import { Role } from './../../../roles/role';

@Component({
  selector: 'app-chip-roles',
  templateUrl: './chip-roles.component.html',
  styleUrls: ['./chip-roles.component.scss']
})
export class ChipRolesComponent implements OnInit {


  separatorKeysCodes: number[] = [];
  filteredRoles: Observable<Role[]>;
  @Input()roles: string[] = [];
  allRoles!:Role[];
  roleCtrl = new FormControl(this.roles,[Validators.required]);

  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;

  constructor(private roleService:RolesService){
    //get Roles
    roleService.getRoles().subscribe(res =>{
      this.allRoles=res;
    })

    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      startWith(this.allRoles),
      map((role:string[]|any ) => (role ? this._filter(role) : this.allRoles)),
    );
  }
  ngOnInit(): void {
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our role
    if (value) {
      this.roles.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.roleCtrl.setValue([]);
  }

  remove(role: string): void {
    const index = this.roles.indexOf(role);

    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push(event.option.viewValue);
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue([]);
  }
  private _filter(value: string):Role[] {
    const filterValue = value;

    return this.allRoles?.filter(role => role.role.includes(filterValue));
  }

}


