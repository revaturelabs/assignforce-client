import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { DocumentAndID } from "../../../model/DocumentAndID";
import { DocumentFile } from "../../../model/DocumentFile";
import { Trainer } from '../../../model/Trainer';
import { Document } from "../../../model/Document";

@Injectable()
export class FilehandlerService {
  constructor(private http: HttpClient) {}

  private filehandlerService = environment.apiUrls.filehandlerController;

  public find(id: number): Observable<Array<DocumentAndID>> {
    return this.http.get<Array<DocumentAndID>>(this.filehandlerService.baseUrl + this.filehandlerService.find);
  }

  public fileValidityChecker(fd: File): boolean {
    if(fd.type != "text/plain" &&
      fd.type != "application/pdf"){
      console.log(fd.type + " is not a valid file format");
      return false;
    }

    //limit the file upload size
    if(fd.size > 5000000 || fd.size <= 0){
      console.log(fd.size + " File is not of acceptable size");
      return false;
    }
    return true;
  }

  public upload(category: String, trainerID: Number, files: FileList): Promise<HttpResponse<Object>> {
    const fd: File = files[0];
    //check and call
    if (!this.fileValidityChecker(fd)) {
      alert("File was not accepted");
      return;
    }

    return new Response(fd.slice(0, fd.size)).text().then(fileContent => {
    const file:DocumentFile = {
      "fileName":fd.name,
      "type":fd.type,
      "size":fd.size,
      "fileContent":fileContent
    };

    const document:Document = {
      "trainerID":trainerID,
      "category":category,
      "file":file
    };

    return this.http.post(this.filehandlerService.baseUrl + this.filehandlerService.find, { document },
    {
      observe:'response',
    }).toPromise();
  });
  }

  public download(trainer: Trainer): Observable<any> {
    const id = trainer.id;
    return this.http.get(this.filehandlerService.baseUrl + this.filehandlerService.find + id);
  }

}
