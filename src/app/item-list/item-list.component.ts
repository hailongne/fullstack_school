import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { School } from '../model/school.model';
import { SchoolService } from '../service/school.service';
import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, RouterLink],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  data: School[] = [];

  constructor(
    private schoolService: SchoolService,
    private notification: NzNotificationService
  ) {}

  getAll() {
    this.schoolService.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit() {
    this.schoolService.getAll().subscribe((school) => {
      this.data = school;
    });
  }

  onDelete(id: any) {
    if (confirm('are you sure?')) {
      this.schoolService.deleteSchool(id).subscribe((data) => {
        this.getAll();
        this.notification.blank('Xóa thành công', '').onClick.subscribe(() => {
          console.log('notification clicked!');
        });
      });
    }
  }
}
