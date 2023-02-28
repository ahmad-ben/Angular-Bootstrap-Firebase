import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from './../model/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private InsAngFireStore: AngularFirestore) { }

  //Add Student
  addStudent(student: Student){
    console.log('data addStudent Work')
    student.id = this.InsAngFireStore.createId();
    return this.InsAngFireStore.collection('/Students').add(student);
  }

  //Get All Student
  getAllStudent(){
    console.log(this.InsAngFireStore.collection('Students'));
    console.log(this.InsAngFireStore.collection('Students').snapshotChanges());
    return this.InsAngFireStore.collection('Students').snapshotChanges();
  }

    //deleteStudent
    deleteStudent(student: Student){
      console.log(student.id);

      return this.InsAngFireStore.doc(`/Students/${student.id}`).delete();
    }

    //UpdateStudent
    updateStudent(student: Student){
      // return this.InsAngFireStore.doc(`/Student/${student.id}`).update(student);
      this.deleteStudent(student);
      this.addStudent(student);
    }
}
