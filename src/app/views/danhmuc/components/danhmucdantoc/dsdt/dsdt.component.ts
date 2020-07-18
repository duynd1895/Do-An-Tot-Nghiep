import { Component, OnInit } from '@angular/core';
import { DanToc } from '../../../../../models/dantoc';
import { DantocService } from '../../../services/dantoc.service';
import { ConfirmDialogService } from '../../../confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dsdt',
  templateUrl: './dsdt.component.html',
  styleUrls: ['./dsdt.component.css']
})
export class DsdtComponent implements OnInit {
  Dantocs: DanToc;
  show: boolean = true;
  type: number = 3;
  pageSize: number = 10;
  pageIndex: number = 1;
  selectedPK: string;
  total: number;
  constructor(
    private dantocService: DantocService,
    private confirmationDialogService: ConfirmDialogService,
    private toatsService: ToastrService
  ) { }

  ngOnInit(): void {
    this.dantocService.getAllDanToc().subscribe((data: any) => {
      this.Dantocs = data.dantoc;
      this.total = data.count;
      console.log(this.Dantocs);
    });
  }

  getAllDanToc() {
    this.dantocService.getAllDanToc().subscribe((data: any) => {
      this.Dantocs = data.dantoc;
      console.log(this.Dantocs);
    });
  }


  public openConfirmationDialog(id: string) {
    console.log(id);
    this.confirmationDialogService.confirm('Xác nhận', 'Bạn thực sự muốn xoá?')
    .then(confirmed => {
      if (confirmed) {
        this.dantocService.deleteDanTocById(id).subscribe(data => {
          this.toatsService.success('Đã xoá thành công', 'Thành công');
          this.getAllDanToc();
        }, (error) => {
          this.toatsService.warning('Có lỗi xảy ra', 'Thất bại');
        });
      }
      // console.log('User confirmed:', confirmed);
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
