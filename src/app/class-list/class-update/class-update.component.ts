import { School } from './../../model/school.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ClassService } from '../../service/class.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../service/school.service';

@Component({
  selector: 'app-class-update',
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
  templateUrl: './class-update.component.html',
  styleUrl: './class-update.component.scss',
})
export class ClassUpdateComponent implements OnInit {
  data: School[] = [];

  classForm: FormGroup = {} as FormGroup;
  constructor(
    private classService: ClassService,
    private schoolService: SchoolService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.classService.find(id).subscribe((data) => {
      this.classForm.patchValue(data);
    });
    this.getAll();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.classForm.reset();
  }
  handleSubmit() {
    const id = this.route.snapshot.params['id'];
    if (this.classForm.valid) {
      console.log(this.classForm.value);
      this.classService
        .updateClass(id, this.classForm.value)
        .subscribe((data) => {
          this.message.success(`Edit Successfully`);
          this.router.navigate(['/class']);
        });
    } else {
      console.log(this.classForm.errors);
    }
  }
}
