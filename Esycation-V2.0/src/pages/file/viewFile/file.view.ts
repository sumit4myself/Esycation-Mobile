import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ServerConfig } from "../../../providers/config";
@IonicPage()
@Component({
    selector: 'file-view',
    templateUrl: 'fileView.html',
})
export class FileViewComponent {

    filePath: String = ServerConfig.imagePath();
    id: number = null;
    constructor(private navParams: NavParams) {

        this.id = this.navParams.get("id");
    }

}