import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServerConfig } from "../../config";
import { CostumErrorHandler } from "../core/error.service";
import { Observable } from "rxjs/Rx";
import { BaseService } from "../core/base.service";
import { FileDetails } from "../../model/file/model.file";
import { File } from "../../model/file/model.file";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
@Injectable()
export class FileService extends BaseService<FileDetails> {
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    private transfer: FileTransfer
  ) {
    super(http, errorHandler);
  }

  uploadFile(data: any, folder: string): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/zuul/files/upload/" +
      folder +
      "/base64?overwrite=true";
    return this.post(url, data);
  }

  remove(id: number): Observable<any> {
    let url: string = ServerConfig.getPath() + "/zuul/files/delete/" + id;

    return this.delete(url);
  }

  fileTransfer(file: File, folder: string): Observable<any> {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let filePath: string =
      ServerConfig.getPath() +
      "/zuul/files/upload/" +
      folder +
      "/base64?overwrite=true";
    let response: any = null;
    let options: FileUploadOptions = {
      fileKey: "",
      fileName: "",
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    };
    options.fileKey = file.name;
    options.fileName = file.name;
    fileTransfer.upload(file.data, filePath, options).then(
      data => {
        response = data;
      },
      err => {
        response = err;
      }
    );

    return Observable.create(observer => {
      observer.next(response);
      observer.complete();
    });
  }
}
