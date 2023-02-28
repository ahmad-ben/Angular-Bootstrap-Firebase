import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileMetaData } from '../model/file-meta-data';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  existObjs: savedObj[]= [];
  stopFun: boolean = false;

  constructor(
    private storeFire: AngularFirestore,
    private storageFile: AngularFireStorage
    ) {}

  //Save Meta Data Of File To FireStore
  saveMetaDtaOfFile(fileObject: FileMetaData) {
    const fileMeta = {
      name: fileObject.name,
      url: fileObject.url,
      size: fileObject.size,
      id: '',
    }
    this.existObjs.map((obj) => {
      if(fileMeta.name == obj.name && fileMeta.size == obj.size){
        this.stopFun = true;
        alert('This File Already Added.')
      }
    })
    if(! this.stopFun){
      fileMeta.id = this.storeFire.createId();
      this.storeFire.collection('/Uploads').add(fileMeta)
    }
  }

  //Display All Files
  getAllFiles() {
    return this.storeFire.collection('/Uploads').snapshotChanges();
  }

  //Delete File
  deleteFile(fileMeta: FileMetaData) {
    this.storeFire.collection('/Uploads').doc(fileMeta.id).delete();
    this.storageFile.ref(`/Uploads/${fileMeta.name}`).delete();
  }

  //Check The Exist Object:
  getObjs(){
  this.storeFire.collection('/Uploads').snapshotChanges()
    .subscribe({
      next: (arrayObjs) => {
        // console.log(arrayObjs);
        this.existObjs = [];
        arrayObjs.map((obj) => {
          let mainObj = obj.payload.doc.data();
          // console.log(mainObj);
          let savedObj: savedObj = {
            size: (mainObj as any).size,
            name: (mainObj as any).name,
          }
          if(!this.existObjs.includes(savedObj)){
            this.existObjs.push(savedObj);
          }
          // console.log(savedObj);
          // console.log(this.existObjs);
        })
      }
    })
  }


}
interface savedObj {
  size: number,
  name: string,
}








