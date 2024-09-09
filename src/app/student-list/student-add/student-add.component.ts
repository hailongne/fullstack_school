import { SchoolService } from './../../service/school.service';
import { Class, School, Student } from './../../model/school.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StudentService } from '../../service/student.service';
import { ClassService } from '../../service/class.service';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    NzUploadModule,
  ],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.scss',
})
export class StudentAddComponent implements OnInit {
  data: School[] = [];
  dataa: Class[] = [];
  filteredClasses: Class[] = [];

  studentForm: FormGroup = {} as FormGroup;
  constructor(
    private studentService: StudentService,
    private schoolService: SchoolService,
    private classService: ClassService,
    private Router: Router,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.studentForm = this.fb.group({
      nameStudent: ['', [Validators.required, Validators.minLength(5)]],
      mssv: ['', [Validators.required]],
      age: [, [Validators.required]],
      hometown: ['', [Validators.required]],
      class_id: [, [Validators.required]],
      school_id: [, [Validators.required]],
    });
  }

  getAll() {
    this.schoolService.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  getAllClass() {
    this.classService.getAll().subscribe((data) => {
      this.dataa = data;
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllClass();

    this.studentForm.get('school_id')?.valueChanges.subscribe((schoolId) => {
      this.filterClassesBySchool(schoolId);
    });
  }

  filterClassesBySchool(id: string): void {
    this.filteredClasses = this.dataa.filter(
      (cls) => cls.school_id?.toString() === id
    );
    this.studentForm.get('class_id')?.reset();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.studentForm.reset();
  }

  handleSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      this.studentService
        .createStudent(this.studentForm.value)
        .subscribe(() => {
          this.message.success(`Add Successfully`);
          this.Router.navigate(['/student']);
        });
    }
  }
}
