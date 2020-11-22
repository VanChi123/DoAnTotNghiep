import {Injectable} from '@angular/core';
// import pdfMake from 'pdfmake/build/pdfmake.min';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
import {CustomVFS} from './pdfmakefonts';
import {BehaviorSubject} from 'rxjs';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfMakeUnicode from 'pdfmake-unicode';
import {DatePipe} from '@angular/common';

pdfMake.vfs = pdfMakeUnicode.pdfMake.vfs;

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = CustomVFS.myVfs;
pdfMake.fonts = {
  // Nirmala: {
  //   normal: 'nirmala_regular.woff',
  //   bold: 'nirmala_bold.woff',
  // },
  // TNR: {
  //   normal: 'tnr_regular.woff',
  //   bold: 'tnr_bold.woff',
  // },

  // Roboto: {
  //   normal: 'pdfmake/build/Roboto-Regular.ttf',
  //   bold: 'pdfmake/build/Roboto-Regular.ttf',
  //   italics: 'pdfmake/build/Roboto-Regular.ttf',
  //   bolditalics: 'pdfmake/build/Roboto-Regular.ttf'
  // },

  Noto: {
    normal: 'noto-sans-regular.woff',
    bold: 'noto-sans-700.woff'
  }


}
// pdfMake.fonts={
//   Roboto:{
//     normal:'Roboto-Regular.ttf',
//     bold:'Roboto-Medium.ttf'
//   }
//
// }

@Injectable({
  providedIn: 'root'
})


export class PdfgeneratorService {
  constructor(private datePipe: DatePipe) {
  }

  data: any;

  getToday() {
    const date = new Date();
    return this.datePipe.transform(date, 'MM-dd-yyyy hh-mm-ss a');
  }

  generatePdfUrl(dataHeader: any, dataKhachHang: any, dataHoaDon: any[], dataTong: any) {
    const data = [];
    for (let i = 0; i < dataHoaDon.length; i++) {
      data.push(this.getContentSanPham(dataHoaDon[i]));
    }
    const docDefinition = {
      content: [
        // header starts
        this.getHeaderDD(dataHeader),
        // //header ends
        // this.getKhachHangDD(dataKhachHang),

        this.getPage1DD(dataKhachHang),

        this.getHeaderSanPham(),

        data,
        this.getTongTienSanPham(dataTong),

        this.getFooter()
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          lineHeight: 1.25
        },
        subheader: {
          fontSize: 8,
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 6
        },
        block: {
          margins: [0, 5]
        },
        tableHeader: {
          bold: true,
          color: 'black',
          fontSize: 8
        },
        footnote: {
          fontSize: 6,
          margin: [0, 1, 0, 0]
        }
      },
      pageSize: 'A4',
      pageOrientation: 'portrait',
      defaultStyle: {
        font: 'Noto',
        fontSize: 10,
        lineHeight: 1.25
      },
      preserveSpace: {
        preserveLeadingSpaces: true
      }
    };

    const pdfUrl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    pdfMake.createPdf(docDefinition).getDataUrl(function (outDoc) {
      pdfUrl$.next(outDoc);
    });

    this.data = pdfUrl$;
    return pdfUrl$;
  }

  // All document definitons for PDFMake stored here
  getHeaderDD(data: any): any {
    const content = [
      {
        columns: [
          {
            image:
              'data:image/png;base64,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',
            width: 150,
          },
          [
            {
              text: 'HOA DON',
              color: '#333333',
              width: '*',
              fontSize: 28,
              bold: true,
              alignment: 'right',
              margin: [0, 0, 0, 15],
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: 'So hoa don.',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: data.soHoaDon,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Ngay in hoa don',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: this.getToday(),
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Ma nhan vien',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: data.idNhanVien,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Ten Nhan vien',
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: data.tenNhanVien,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                      width: 100,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Trang thai',
                      color: '#aaaaab',
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                      width: '*',
                    },
                    {
                      text: data.status === 1 ? 'Da Thanh Toan' : 'Chua thanh toan',
                      bold: true,
                      fontSize: 14,
                      alignment: 'right',
                      color: 'green',
                      width: 100,
                    },
                  ],
                },
              ],
            },
          ],
        ],
      }
    ];
    return content;
  }

  // thông tin khách hàng
  getPage1DD(data: any): any {
    const dd = [
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                stack: [
                  {
                    text: '\tTen khach hang',
                    margin: [50, 5],
                  },
                ],
              },
              {
                stack: [
                  {
                    text: '\t' + data.tenKhachHang,
                    margin: [50, 5],
                  },
                ],
              }
            ],
            [
              {
                stack: [
                  {
                    text: '\tTen khach hang',
                    margin: [50, 5],
                  },
                ],
              },
              {
                stack: [
                  {
                    text: '\t' + data.tenKhachHang,
                    margin: [50, 5],
                  },
                ],
              }
            ], [
              {
                stack: [
                  {
                    text: '\tDia chi',
                    margin: [50, 5],
                  },
                ],
              },
              {
                stack: [
                  {
                    text: '\t' + data.diaChi,
                    margin: [50, 5],
                  },
                ],
              }
            ], [
              {
                stack: [
                  {
                    text: '\tSo dien thoai',
                    margin: [50, 5],
                  },
                ],
              },
              {
                stack: [
                  {
                    text: '\t' + data.soDienThoai,
                    margin: [50, 5],
                  },
                ],
              }
            ], [
              {
                stack: [
                  {
                    text: '\tGioi tinh',
                    margin: [50, 5],
                  },
                ],
              },
              {
                stack: [
                  {
                    text: '\t' + data.gioiTinh ? 'Nam' : 'Nu',
                    margin: [50, 5],
                  },
                ],
              }
            ],
          ]
        }, // end table 1 ve khach hang
        layout: {
          defaultBorder: false
        },
        lineHeight: 0.75
      }
    ];
    return dd;
  }

  // tiêu đề bảng
  getHeaderSanPham() {
    const dd = [
      {
        text: '\n'
      },
      {
        table: {

          widths: [60, 140, 80, 50, 50, 90],
          body: [
            [{
              text: 'Mã sản phẩm'
            },
              {
                text: 'Tên sản phẩm'
              },
              {
                text: 'Giá'
              },
              {
                text: 'Số lượng'
              },
              {
                text: 'Giảm giá'
              },
              {
                text: 'Thành tiền'
              }
            ]
          ]
        }
      },
    ];
    return dd;
  }

  getContentSanPham(data: any) {
    const dd = [
      {
        table: {

          widths: [60, 140, 80, 50, 50, 90],
          body: [
            [{
              text: data.maSanPham
            },
              {
                text: data.tenSanPham
              },
              {
                text: data.gia
              },
              {
                text: data.soLuong
              },
              {
                text: data.giamGia
              },
              {
                text: data.thanhTien
              }
            ]
          ]
        }
      },
    ];
    return dd;
  }

  // tổng tiền sản phẩm
  getTongTienSanPham(data: any) {
    const dd = [
      {
        table: {

          widths: [60, 140, 80, 50, 50, 90],
          body: [
            [{
              text: ''
            },
              {
                text: ''
              },
              {
                text: ''
              },
              {
                text: ''
              },
              {
                text: 'Tổng'
              },
              {
                text: data.total,
                color: 'red',
                fontSize: 13
              }
            ],
            [{
              text: ''
            },
              {
                text: ''
              },
              {
                text: ''
              },
              {
                text: ''
              },
              {
                text: 'Giảm giá hóa đơn'
              },
              {
                text: data.giamGiaHoaDon,
                color: 'red',
                fontSize: 13
              }
            ],
            [{
              text: ''
            },
              {
                text: ''
              },
              {
                text: ''
              },
              {
                text: ''
              },
              {
                text: 'Thành tiền'
              },
              {
                text: data.thanhTien,
                color: 'red',
                fontSize: 13
              }
            ]
          ]
        }
      },
    ];
    return dd;
  }


  // Footer
  getFooter(): any {
    const content = [
      {
        columns: [
          {
            // width: 150,
          },
          [
            {
              text: 'Cwatch Shop xin cảm ơn quý khách. Hẹn gặp lại quý khách!',
              color: '#333333',
              width: '*',
              fontSize: 14,
              bold: true,
              alignment: 'right',
              margin: [0, 0, 0, 15],
            },
          ],
        ],
      }
    ];
    return content;
  }

  // download hóa đơn
  // onDownload(){
  //   this.data.download();
  // }


}


