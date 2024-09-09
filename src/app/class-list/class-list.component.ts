import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { Class } from '../model/school.model';
import { ClassService } from '../service/class.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, RouterLink],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss',
})
export class ClassListComponent implements OnInit {
  data: Class[] = [];

  constructor(
    private classService: ClassService,
    private notification: NzNotificationService
  ) {}

  getAll() {
    this.classService.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit() {
    this.classService.getAll().subscribe((classroom) => {
      this.data = classroom;
    });
  }

  onDelete(id: any) {
    if (confirm('are you sure?')) {
      this.classService.deleteClass(id).subscribe((data) => {
        this.getAll();
        this.notification.blank('Xóa thành công', '').onClick.subscribe(() => {
          console.log('notification clicked!');
        });
      });
    }
  }
}
