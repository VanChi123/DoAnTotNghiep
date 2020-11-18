import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private sanitizer: DomSanitizer,
              public dialogRef: MatDialogRef<ViewImageComponent>) { }

              url: any;
  blob;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  dataSub: any;

  ngOnInit(): void {
    if (this.data){
      this.dataSub = this.data;
      debugger
      this.blob = new Blob(
        [
          new Uint8Array(atob((this.data.imgData.imgBase64)).split('').map(char => char.charCodeAt(0)))
         // this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.data.imgData.imgBase64}`)
        ],
        {type: 'image/jpeg'});
      this.url = URL.createObjectURL(this.blob);
      // this.url = this.data.imgBase64;
    }
  }

  downloadFile() {
    const fileNameTailArr = this.data.imgData.img.split('\\');
    const tailName = fileNameTailArr[fileNameTailArr.length - 1];

    this.downloadLink.nativeElement.href = this.url;
    this.downloadLink.nativeElement.download = tailName;
    this.downloadLink.nativeElement.click();
  }

  // decodeImg(){
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.data.imgBase64}`);
  // }

  handleGetAvatar(avatar: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${avatar}`);
    // return atob(this.dataSub.imgBase64);
  }

}
