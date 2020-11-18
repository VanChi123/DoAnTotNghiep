import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserManagementService} from '../../../admin-manage/services/user-management.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-otp-send',
  templateUrl: './otp-send.component.html',
  styleUrls: ['./otp-send.component.scss']
})
export class OtpSendComponent implements OnInit {
  otpNumber: any;

  interval: any;
  seconds = 0; // countdown for resend Email OTP
  countVal = 60; // default countdown value


  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<OtpSendComponent>,
              private userManagementService: UserManagementService,
              private  toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    debugger
    this.countDown();
  }

  // onSendEmailOTP() {
  //   if (this.seconds < 1) {
  //     // this.sendEmail.emit({email: this.myProfileForm.get('email').value});
  //     this.countDown();
  //   }
  // }

  clearTimer() {
    clearInterval(this.interval);
    this.seconds = 0;
  }

  countDown() {
    this.clearTimer();
    this.seconds = this.countVal;
    this.interval = setInterval(() => {
      this.seconds === 0 ? this.clearTimer() : this.seconds -= 1;
    }, 1000);
  }

  onResendOTP(){
    this.clearTimer();
    this.userManagementService.register({username: this.data.form.userName, email: this.data.form.email}).subscribe(e => {
      debugger
      if (e && e.data && e.data.success) {
        console.log('gửi lại thành công ');
        this.countDown();
      }
    });
  }

  onSubmitOTP(){
    debugger
    if (this.data.key === this.otpNumber.toString()){
      this.dialogRef.close({result: true});
    }else {
      this.toastrService.warning('Mã OTP không đúng, hãy thử lại', '');
    }
  }

  onCloseDialog(){
    this.dialogRef.close({result: false});
  }


}
