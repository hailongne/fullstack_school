import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { AddItemComponent } from './item-list/add-item/add-item.component';
import { UpdateItemComponent } from './item-list/update-item/update-item.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassAddComponent } from './class-list/class-add/class-add.component';
import { ClassUpdateComponent } from './class-list/class-update/class-update.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentAddComponent } from './student-list/student-add/student-add.component';
import { StudentUpdateComponent } from './student-list/student-update/student-update.component';
import { StudentDetailComponent } from './student-list/student-detail/student-detail.component';

export const routes: Routes = [
  { path: 'school', component: ItemListComponent },
  { path: 'school/add', component: AddItemComponent },
  { path: 'school/update/:id', component: UpdateItemComponent },

  { path: 'class', component: ClassListComponent },
  { path: 'class/add', component: ClassAddComponent },
  { path: 'class/update/:id', component: ClassUpdateComponent },

  { path: 'student', component: StudentListComponent },
  { path: 'student/add', component: StudentAddComponent },
  { path: 'student/update/:id', component: StudentUpdateComponent },
  { path: 'student/detail/:id', component: StudentDetailComponent },
];
