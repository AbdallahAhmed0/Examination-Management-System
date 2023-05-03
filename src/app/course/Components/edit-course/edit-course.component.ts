import { ChangeDetectorRef, Component, OnInit,  } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from '../../course.service';
import { Admin } from 'src/app/admins/Models/admin';
import { AdminsService } from 'src/app/admins/Services/admins.service';
import { Course } from '../../course.model';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  course!:Course;
  EditCourse!:Course;
  id!:number;
  consoleError:any;
  subRoute?:Subscription;
  newCourse!: FormGroup;
  subCourse?:Subscription;
  theGroups :any[]=[];
  admins :Admin[]=[];
  theteachers:any =[] ;

  constructor( private fb:FormBuilder,
    private router:Router,
    private courseService:CourseService,
    private adminservice:AdminsService,
    private activatedRoute:ActivatedRoute,
    ) { }


  ngOnInit(): void {
    this.getGroups()
    this.getAdmins()

    this.subRoute=this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.id=Number(paramMap.get('id'));

      this.courseService.getCourseById(this.id).subscribe(data =>{

        this.course=data
        this.items=data.admins
        let chosenGroup
        for(let group of this.theGroups){
          if(data.groupName==group.name){
             chosenGroup=group
          }

        }


        this.newCourse=this.fb.group({
          name:[data.courseName,[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
          code:[data.courseCode,[Validators.required,Validators.minLength(3)]],
          group:[chosenGroup,[Validators.required]],
          adminIds:["",]


        })




      })


    })
  }



  goback(){
    this.router.navigateByUrl('/courses');

  }
  updateCourse(){

    for (const item of this.items) {
      this.theteachers.push(item.id)
    }
    this.teachers?.setValue(this.theteachers)

    const observer={
      next: (course:Course) => {
        this.router.navigateByUrl('/courses');
        this.courseService.openSnackBar('Added');
      },
      error: (err:Error)=>{
        this.consoleError = err.message
        }
    }
    this.EditCourse=this.newCourse.value
    this.EditCourse.id=this.id
    console.log(this.EditCourse);

    this.subCourse= this.courseService.addCourse(this.EditCourse).subscribe(observer);


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
      this.items.push(this.selecteditem).id;
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
