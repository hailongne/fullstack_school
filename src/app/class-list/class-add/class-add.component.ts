import { School } from './../../model/school.model';
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
import { Class } from '../../model/school.model';
import { ClassService } from '../../service/class.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SchoolService } from '../../service/school.service';

@Component({
  selector: 'app-class-add',
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
  templateUrl: './class-add.component.html',
  styleUrl: './class-add.component.scss',
})
export class ClassAddComponent implements OnInit {
  data: School[] = [];

  classForm: FormGroup = {} as FormGroup;
  constructor(
    private classService: ClassService,
    private schoolService: SchoolService,
    private Router: Router,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.classForm = this.fb.group({
      nameClass: ['', [Validators.required, Validators.minLength(5)]],
      school_id: [0, [Validators.required]],
    });
  }

  getAll() {
    this.schoolService.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit() {
    this.schoolService.getAll().subscribe((classroom) => {
      this.data = classroom;
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.classForm.reset();
  }

  handleSubmit() {
    if (this.classForm.valid) {
      console.log(this.classForm.value);
      this.classService.createClass(this.classForm.value).subscribe((data) => {
        this.message.success(`Edit Successfully`);
        this.Router.navigate(['/class']);
      });
    }
  }
}
