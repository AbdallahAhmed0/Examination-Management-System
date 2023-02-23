import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Students} from './../../Models/student'
import { StudentsService } from '../../Services/students.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.scss']
})
export class EditStudentsComponent implements OnInit {

  hide = true;

  student:Students ={} as Students;
  newStudent!: FormGroup;
  EditStudent!:Students;

  constructor(private studentsService:StudentsService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private fb:FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      const id=Number(paramMap.get('id'));

      this.studentsService.getStudentById(id).subscribe(data =>{
      this.student=data;

    this.newStudent = new FormGroup({
      firstName: new FormControl(data.firstName, [Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
      lastName: new FormControl(data.lastName, [Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
      universityId: new FormControl(data.universityId, [Validators.required]),
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      password:new FormControl(data.password,[Validators.required,Validators.minLength(6)]),
      role:new FormControl(data.roles,[Validators.required]),
      enable:new FormControl(true),
<<<<<<< HEAD
      locked:new FormControl(false),
      year:new FormControl(data.year)
=======
      locked:new FormControl(false)
>>>>>>> 662301a7e5a746bdc8b06218950d2c96b3009c74

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

  editStudent(id:number){

    const observer={
      next: (student:Students) => {
        alert("Student Updated Successfuly");
        this.router.navigateByUrl('/students');
      },
      error: (err:Error)=>{alert(err.message)}
    }

    this.EditStudent=this.newStudent.value;
    this.EditStudent.id=id;

    if(!(this.EditStudent.email == this.student.email ||
      this.EditStudent.firstName == this.student.firstName ||
      this.EditStudent.lastName == this.student.lastName ||
      this.EditStudent.universityId == this.student.universityId ||
      this.EditStudent.enable == this.student.enable
      )){

        this.studentsService.updateStudents(this.EditStudent).subscribe(() =>{});
    console.log(this.EditStudent);
    }
    this.goback();
  }


    goback(){
      this.router.navigate(['students'])
    }



    get firstName() {
      return this.newStudent.get('firstName');
    }
    get lastName() {
      return this.newStudent.get('lastName');
    }
    get universityId() {
      return this.newStudent.get('universityId');
    }
    get email() {
      return this.newStudent.get('email');
    }
    get password() {
      return this.newStudent.get('password');
    }
    get role() {
      return this.newStudent.get('role');
    }
    get specialization(){
      return this.newStudent.get('specialization');
    }
    get enable(){
      return this.newStudent.get('enable');
    }

}

