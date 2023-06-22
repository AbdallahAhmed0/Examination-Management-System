import { Component, OnInit,  } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from '../../course.service';
import { Admin } from 'src/app/admins/Models/admin';
import { AdminsService } from 'src/app/admins/Services/admins.service';
import { Course } from '../../course.model';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  consoleError:any;
  newCourse!: FormGroup;
  subCourse?:Subscription;
  theGroups ?:any[]=[];
  admins :Admin[]=[];

  constructor(private router:Router,
    private fb:FormBuilder,
    private courseService:CourseService,
    private adminservice:AdminsService) { }


  ngOnInit(): void {
    this.getGroups()
    this.getAdmins()



    this.newCourse=this.fb.group({
      name:['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      code:["",[Validators.required,Validators.minLength(3)]],
      group:["",[Validators.required]],
      adminIds:["",]


    })

  }



  goback(){
    this.router.navigateByUrl('/courses');

  }
  addCourse(){
    let teachers =[] ;
    for (const item of this.items) {
      teachers.push(item.id)
    }
    this.teachers?.setValue(teachers)
    console.log(this.newCourse.value);
    const observer={
      next: (course:Course) => {
        this.router.navigateByUrl('/courses');
        this.courseService.openSnackBar('Added');
      },
      error: (err:Error)=>{
        this.consoleError = err.message
        }
    }

  this.subCourse= this.courseService.saveCourse(this.newCourse.value).subscribe(observer);


  }
  getGroups(){
    this.courseService.getGroups().subscribe(data=>{

      this.theGroups=data

    })
  }
  getAdmins(){
    this.adminservice.getAllAdmins().subscribe(data=>{

      this.admins=data
    })
  }
  /// chips impelementation

  items:any = [];
  selecteditem: any;

  addItem() {

    if (this.selecteditem && !this.items.includes(this.selecteditem)) {
      this.items.push(this.selecteditem);
      this.selecteditem = null;
    }
  }

  removeItem(item: any) {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }


  get courseName(){
    return this.newCourse.get("name")
  }
  get courseCode(){
    return this.newCourse.get("code")
  }
  get groups(){
    return this.newCourse.get("group")
  }
  get teachers(){
    return this.newCourse.get("adminIds")
  }

}
