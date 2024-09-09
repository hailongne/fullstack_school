import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Class, School, Student } from '../../model/school.model';
import { StudentService } from '../../service/student.service';
import { ClassService } from '../../service/class.service';
import { SchoolService } from '../../service/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-student-update',
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
  ],
  templateUrl: './student-update.component.html',
  styleUrl: './student-update.component.scss',
})
export class StudentUpdateComponent implements OnInit {
  data: School[] = [];
  dataa: Class[] = [];
  filteredClasses: Class[] = [];

  studentForm: FormGroup = {} as FormGroup;
  constructor(
    private studentService: StudentService,
    private classService: ClassService,
    private schoolService: SchoolService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
    const id = this.route.snapshot.params['id'];

    this.studentService.find(id).subscribe((data) => {
      this.studentForm.patchValue(data);
    });

    this.getAll();

    this.getAllClass();

    this.studentForm.get('school_id')?.valueChanges.subscribe((schoolId) => {
      this.filterClassesBySchool(schoolId);
    });
  }

  filterClassesBySchool(schoolId: string): void {
    this.filteredClasses = this.dataa.filter(
      (cls) => cls.school_id === +schoolId
    );

    if (this.filteredClasses.length === 0) {
      this.studentForm.get('class_id')?.reset();
      this.message.warning('Không có lớp học nào thuộc trường này');
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.studentForm.reset();
  }

  handleSubmit() {
    const id = this.route.snapshot.params['id'];
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      this.studentService
        .updateStudent(id, this.studentForm.value)
        .subscribe(() => {
          this.message.success(`Edit Successfully`);
          this.router.navigate(['/student']);
        });
    } else {
      console.log(this.studentForm.errors);
    }
  }
}
