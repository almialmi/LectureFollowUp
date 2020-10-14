
import { Injectable } from '@angular/core';
import { Study } from "src/app/sharedsub/study.model";
import { Educationalfield } from 'src/app/sharedsub/educationalfield.model';
import {Department} from 'src/app/sharedsub/department.model';
import { Universtiy } from 'src/app/sharedsub/universtiy.model';
 
@Injectable()
export class DataService {
  getStudy() {
    return [
     new  Study(1, 'Natural' ),
     new  Study(2, 'Social' ),
    
    ];
  }
   
  getFields() {
   return [
     new Educationalfield(1, 'Natural', 'Medicin' ),
     new Educationalfield(2, 'Natural', 'Enjinering' ),
     new Educationalfield(3, 'Natural', 'Teaching'),
     new Educationalfield(4, 'Natural', 'Dentist'),
     new Educationalfield(5, 'Natural', 'Health' ),
     new Educationalfield(6, 'Social', 'Accounting'),
     new Educationalfield(7, 'Social', 'Law' ),
     new Educationalfield(8, 'Social', 'Agriculture' ),
     new Educationalfield(9, 'Social', 'Economics' ),
     new Educationalfield(10, 'Social', 'Business')
    ];
  }
  getDepartment() {
      return [
          new Department(1,"medicin" ,"submedicin"),
          new Department(2,"medicin" ,"specialist"),
          new Department(3,"medicin" ,"subsubmedicin"),
          new Department(4,"Enjinering" ,"software"),
          new Department(5,"Enjinering" ,"electrical"),
          new Department(6,"Enjinering" ,"mechanical"),
          new Department(7,"Enjinering" ,"electromechanical"),
          new Department(8,"Enjinering" ,"chemical"),
          new Department(9,"Teaching" ,"Maths"),
          new Department(10,"Teaching" ,"Phisics"),


      ];
}
getCountries() {
  return [
   new Universtiy(1,'Adama Science and Technology University' ),
   new Universtiy(2, 'Addis Ababa Science and Technology University' ),
   new Universtiy(3, 'Addis Ababa University' ),
   new Universtiy(4, 'Adigrat University' ),
   new Universtiy(5, 'Aksum University' ),
  
   new Universtiy(7, 'Ambo University' ),
   new Universtiy(8, 'Arba Minch University' ),
   new Universtiy(9, 'Assosa University' ),
   new Universtiy(10, 'Bahir Dar University' ),
   new Universtiy(11, 'Bule Hora University' ),
   new Universtiy(12, 'Debre Berhan University' ),
   new Universtiy(13, 'Debre Markos University' ),
   new Universtiy(14, 'Debre Tabor University' ),
   new Universtiy(15, 'Dilla University' ),
   new Universtiy(16, 'Dire Dawa University' ),
   new Universtiy(17, 'Haramaya University' ),
   new Universtiy(17, 'Hawassa University' ),
   new Universtiy(19, 'Jigjiga University' ),
   new Universtiy(20, 'Jimma University' ),
   new Universtiy(21, 'Madda Walabu University' ),
   new Universtiy(22, 'Mettu University' ),
   new Universtiy(23, 'Mizan Tepi University' ),
   new Universtiy(24, 'Semera University' ),
   new Universtiy(25, 'University of Gondar' ),
   new Universtiy(26, 'Wachamo University' ),
   new Universtiy(27, 'Wolaita Sodo University' ),
   new Universtiy(28, 'Woldia University' ),
   new Universtiy(29, 'Wolkite University' ),
   new Universtiy(30, 'Wollega University' ),
   new Universtiy(31, 'Wollo University' ),
  

  ];
}
}