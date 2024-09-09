import { StudentService } from './../service/student.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { Class, Student } from '../model/school.model';
import { ClassService } from '../service/class.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent implements OnInit {
  data: Student[] = [];

  constructor(
    private studentService: StudentService,
    private notification: NzNotificationService
  ) {}

  getAll() {
    this.studentService.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit() {
    this.getAll();
  }

  onDelete(id: any) {
    if (confirm('are you sure?')) {
      this.studentService.deleteStudent(id).subscribe((data) => {
        this.getAll();
        this.notification.blank('Xóa thành công', '').onClick.subscribe(() => {
          console.log('notification clicked!');
        });
      });
    }
  }
}
