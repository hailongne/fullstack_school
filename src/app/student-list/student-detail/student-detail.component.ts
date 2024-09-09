import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/school.model';
import { StudentService } from '../../service/student.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, NzButtonModule, RouterLink, NzCardModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent implements OnInit {
  data: Student[] = [];

  constructor(private studentService: StudentService) {}

  getAll() {
    this.studentService.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit() {
    this.getAll();
  }
}
