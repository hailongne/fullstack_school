export class School {
  id?: number;
  nameSchool?: string;
  locationSchool?: string;
  rating?: number;
  school_id?: number;
}

export class Class {
  id?: number;
  nameClass?: string;
  school_id?: number;
  school_data?: School;
}

export class Student {
  id?: number;
  nameStudent?: string;
  avatar?: string;
  mssv?: string;
  age?: number;
  hometown?: string;
  class_id?: string;
  school_id?: string;
  class_data?: Class;
  school_data?: School;
}
