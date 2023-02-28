import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Student } from './../../model/student';
import { DataService } from './../../Services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  studentsList: Student[] = [];
  id: string = '';
  FirstName: string = '';
  LastName: string = '';
  Email: string = '';
  Mobile: string = '';
  studentObject: Student = {
    id: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Mobile: ''
  }

  constructor(private auth: AuthService, private data: DataService){}

  ngOnInit(): void {
    this.getAllStudent();
  }

  getAllStudent() {
    console.log('work');
    this.data.getAllStudent().subscribe({
      next: (res) => {
        console.log('work');
        console.log(res);
        this.studentsList = res.map((e: any) => {
          console.log(e);
          console.log(e.payload);
          console.log(e.payload.doc);
          console.log(e.payload.doc.data());
          console.log(e.payload.doc.id);
          const data = (e.payload.doc.data());
          console.log(data.id);

          data.id = e.payload.doc.id;
          console.log(data);
          console.log(data.id);
          return data;
        })
      },
      error: (errorPara) => {
        alert(errorPara.message)
      }
    })
  }

  resetForm(){
    this.id = '';
    this.FirstName = '';
    this.LastName = '';
    this.Email = '';
    this.Mobile = '';
  }

  addStudent() {
    console.log('AddStudent Method Work');
    if(this.FirstName == '' ||
      this.LastName == '' ||
      this.Email == '' ||
      this.Mobile == ''
      ){
        console.log(this.FirstName, this.LastName, this.Email, this.Mobile)
        alert('Fill All The Input Fields.');
        return ;
    }
    console.log('AddStudent Method Work 2');
    this.studentObject.id= '';
    this.studentObject.FirstName= this.FirstName;
    this.studentObject.LastName= this.LastName;
    this.studentObject.Email= this.Email;
    this.studentObject.Mobile= this.Mobile;
    this.data.addStudent(this.studentObject);
    this.resetForm();
  }

  updateStudent() {
    // this.deleteStudent()
  }

  deleteStudent(student: Student) {
    if(window.confirm(`Are You Sure That You Are Want To Delete ${student.FirstName} ${student.LastName}?`)){
      this.data.deleteStudent(student);
    }
  }
}

// logout(){
//   this.auth.logout()
// }
