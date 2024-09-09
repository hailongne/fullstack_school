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
import { School } from '../../model/school.model';
import { SchoolService } from '../../service/school.service';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form'; // Import NzFormModule
import { NzInputModule } from 'ng-zorro-antd/input'; // Nếu cần input
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent implements OnInit {
  school: School = {
    id: 0,
    nameSchool: '',
    locationSchool: '',
    rating: 0,
  };

  schoolForm: FormGroup = {} as FormGroup;
  constructor(
    private message: NzMessageService,
    private schoolService: SchoolService,
    private Router: Router,
    private fb: FormBuilder
  ) {
    this.schoolForm = this.fb.group({
      nameSchool: ['', [Validators.required, Validators.minLength(5)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      locationSchool: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.schoolForm.reset();
  }

  handleSubmit() {
    if (this.schoolForm.valid) {
      console.log(this.schoolForm.value);
      this.schoolService
        .createSchool(this.schoolForm.value)
        .subscribe((data) => {
          this.message.success(`Create Successfully`);
          this.Router.navigate(['/school']);
        });
    }
  }
}
