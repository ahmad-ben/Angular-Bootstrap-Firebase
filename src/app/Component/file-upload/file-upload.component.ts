import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { FileService } from 'src/app/Services/file.service';
import { FileMetaData } from './../../model/file-meta-data';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{

  selectedFiles!: FileList | false;
  currentFileUpload!: FileMetaData;
  percentage: number = 0;
  listOfFiles: FileMetaData[] = [];
  urlsArray: File[]= [];

  constructor(
    private fileService: FileService,
    private fireStorage: AngularFireStorage){}

    selectFile($event: any){
      if($event.target.files.length == 0){
        this.selectedFiles = false;
      }else{
        this.selectedFiles = $event.target.files;
      }
    }

  ngOnInit()  {
    this.getAllFiles();
    this.fileService.getObjs()
  }

  uploadFile(){
    this.currentFileUpload = new FileMetaData((this.selectedFiles as FileList)[0]);
    const path= `/Uploads/${this.currentFileUpload.file.name}`;
    const storageRef= this.fireStorage.ref(path);
    const uploadTask = storageRef.put((this.selectedFiles as FileList)[0]);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe({
          next: (nextPara) => {
            this.currentFileUpload.url = nextPara,
            this.currentFileUpload.size = this.currentFileUpload.file.size,
            this.currentFileUpload.name = this.currentFileUpload.file.name,
            this.fileService.saveMetaDtaOfFile(this.currentFileUpload),
            this.ngOnInit()
          }
        })
      })
    ).subscribe({
      next: (nextPara) => {
        this.percentage =  Math.trunc(
          (nextPara!.bytesTransferred * 100 / nextPara!.totalBytes)
        );
      },
      error: (errorPara) => {
        console.log('Error Occurred');
      },
    })
  }

  getAllFiles(){
    this.fileService.getAllFiles().subscribe({
      next: (nextPara) => {
        this.listOfFiles = nextPara.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (errorPara) => {
        console.log('Error Occurred While Fetching File Meta Data.');
      },
    })
  }

  deleteFile(file : FileMetaData){
    if(window.confirm('Are You Sure That You Want To Delete This File'+ file.name + '?')){
      this.fileService.deleteFile(file);
      this.ngOnInit();
    }
  }

  downloadTest(url: any){
    console.log(url);
  }
}



