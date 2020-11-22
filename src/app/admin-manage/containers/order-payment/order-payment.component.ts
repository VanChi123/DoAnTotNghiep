import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {PdfgeneratorService} from '../../services/pdf-make.service';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {
  pdfUrl = null;


  dataHeader: any = {
    soHoaDon: 'HD0.25848543',
    status: 1,
    idNhanVien: 'NV123456',
    tenNhanVien: 'Tran Thi Thu Trang'
  };

  dataKhachHang: any = {
    maKhachHang: 'KH00123',
    tenKhachHang: 'Bùi Văn Chí',
    gioiTinh: true,
    diaChi: 'Sóc sơn, Hà nội',
    soDienThoai: '092875747'
  };

  dataDonHang: any = [{
    maSanPham: 'SP0384',
    tenSanPham: 'Dong ho XWatch 068',
    soLuong: 1,
    gia: 1233000,
    giamGia: '5%',
    thanhTien: 1100000
  },
    {
      maSanPham: 'SP0365',
      tenSanPham: 'Dong ho mTP 068',
      soLuong: 2,
      gia: 1233000,
      giamGia: '5%',
      thanhTien: 5642322
    }
  ];

  dataTong: any = {
    tong: 123995949,
    giamGiaHoaDon: '10%',
    thanhTien: 184858348
  };

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<OrderPaymentComponent>,
              private pdfService: PdfgeneratorService,
              private sanitizer: DomSanitizer
) { }

  ngOnInit(): void {
    this.createHoaDon();
  }

  createHoaDon() {
    this.pdfService.generatePdfUrl(this.dataHeader, this.dataKhachHang, this.dataDonHang, this.dataTong).subscribe(
      data => {
        if (data) {
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data);
        }
      }
    );
  }

}
