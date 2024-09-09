import { School } from './../../model/school.model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SchoolService } from '../../service/school.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.scss',
})
export class UpdateItemComponent implements OnInit {
  school: School = {
    id: 0,
    nameSchool: '',
    rating: 0,
    locationSchool: '',
  };
  schoolForm: FormGroup = {} as FormGroup;
  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.schoolForm = this.fb.group({
      nameSchool: ['', [Validators.required, Validators.minLength(5)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      locationSchool: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.schoolService.find(id).subscribe((school) => {
      this.school = school;
      this.schoolForm.patchValue(school);
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.schoolForm.reset();
  }

  handleSubmit() {
    const id = this.route.snapshot.params['id'];
    if (this.schoolForm.valid) {
      console.log(this.schoolForm.value);
      this.schoolService
        .updateSchool(id, this.schoolForm.value)
        .subscribe((data) => {
          this.message.success(`Edit Successfully`);
          this.router.navigate(['/school']);
        });
    } else {
      console.log(this.schoolForm.errors);
    }
  }
}
