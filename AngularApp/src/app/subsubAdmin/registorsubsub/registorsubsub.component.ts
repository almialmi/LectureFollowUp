import { Component, ElementRef, OnInit,ViewChild} from '@angular/core';
import {  SubsubAdminService } from 'src/app/sharedsubsub/subsub-admin.service';
import { FormGroup, NgForm,FormBuilder,FormControl,Validators}  from '@angular/forms';
import { Router } from "@angular/router";
import { Educstatus } from "src/app/sharedsub/educstatus.model";
import {Role} from "src/app/sharedsub/role.model";
import { Universtiy } from "src/app/shared/universtiy.model";
import { Study } from "src/app/sharedsub/study.model";
import { Educationalfield } from 'src/app/sharedsub/educationalfield.model';
import {Department} from 'src/app/sharedsub/department.model';
import { DataService } from 'src/app/subAdmin/registorsub/dataService';
import { from } from 'rxjs';
import { $ } from 'protractor';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-registorsubsub',
  templateUrl: './registorsubsub.component.html',
  styleUrls: ['./registorsubsub.component.css'],
 // providers: [SubsubAdminService]
 providers: [DataService]
})
export class RegistorsubsubComponent implements OnInit {
  myForm:NgForm;
  fileName = 'UniversityStaff';
  fileToUpload: File = null;
  uploadedFile: Array<File>= null ;
  selectedStudy:Study = new Study(0, 'Natural'); 
  selectedStudyy:Educationalfield= new Educationalfield(0 ,"Natural", "medicine") ;
  studys : Study[];
  fields: Educationalfield [];

  dept:  Department[];
  selectedCountry:Universtiy = new Universtiy(0, 'Ambo University'); 
  universtiys : Universtiy[];
  universty;
  compass;


  status:  Educstatus[] = [
      { name: "Bachelor"},
      { name: "MBA"},
      { name: "Master"},
      { name: "PhD"},
      { name: "PostDoc"},
  
     
  ];
  rol : Role[] = [
    { name: "Teacher"},
    { name: "DepartmentHead"},
    { name: "Both"},
    { name: "Secretary"},
    

  ];
  data: [][];
  dataValues = [];
  editField: string;
  @ViewChild('myInput') myInputVariable: ElementRef;
  @ViewChild('myInput1') myInputVariable1: ElementRef;

  constructor(public subsubAdminService : SubsubAdminService , public router : Router , private _dataService: DataService,private formBuilder: FormBuilder) {
    this.studys = this._dataService.getStudy();
    this.universtiys = this._dataService.getCountries();
    this.universty = this.myUniversity();
    this.compass = this.myCompus();
   }
  model = {
    firstName: '',
    middlename:'',
    lastname: '',
    mobile:'',
    email: '',
    universtiy:'',
    

  };
  emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  showSucessMessage: boolean;
  serverErrorMessage : string;
  showServerError:boolean;
  showServerError1:boolean;


  ngOnInit(): void {
    
  }
show:boolean=false;
setShowTrue(name:any){
  console.log(name);
  this.show = true;
}
reset() {
    this.myInputVariable.nativeElement.value = '';
    this.show = false;
}
reset1() {
  this.myInputVariable1.nativeElement.value = '';
  this.show = false;
}
  onSelect(countryidd) {
    this.fields = this._dataService.getFields()
                 .filter((item)=> item.studyname == countryidd);
  }
  onSelectt(countryidd) {
    this.dept = this._dataService.getDepartment()
                 .filter((item)=> item.fieldname == countryidd);
  }
  fileChange(event) {
    this.uploadedFile = event.target.files;
  }
  onSubmit(form : NgForm){
    if(this.uploadedFile.length>0){
      let file: File = this.uploadedFile[0];
      let formData:FormData = new FormData();

      formData.append('firstName',form.value.firstName);
      formData.append('middleName',form.value.middleName);
      formData.append('lastName',form.value.lastName);
      formData.append('gender',form.value.gender);
      formData.append('mobile',form.value.mobile);
      formData.append('email',form.value.email);
      formData.append('university',form.value.university);
      formData.append('compass',form.value.compass);
      formData.append('professionalTitle',form.value.professionalTitle);
      formData.append('role',form.value.role);
      formData.append('study',form.value.study);
      formData.append('educationField',form.value.educationField);
      formData.append('department',form.value.department);
      formData.append('workExperience',form.value.workExperience);
      formData.append('certificate',form.value.certificate);
      formData.append('researchArea',form.value.researchArea);
      formData.append('futureResearchInterest',form.value.futureResearchInterest);
      formData.append('numberOfPublications',form.value.numberOfPublications);
      formData.append('file', file,file.name);
      
    this.subsubAdminService.postUniversityStaff(formData).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false,4000);
        this.resetForm(form);
        this.reset1();
       
      },
      err => {
        if( err.status == 422){
          this.showServerError1=true;
          this.serverErrorMessage = err.error.join('<br>');
          setTimeout(() => this.showServerError1 = false,4000);
        }
        else
          this.showServerError1=true;
          this.serverErrorMessage = "something went wrong";
          setTimeout(() => this.showServerError1 = false,4000);
      }
    );

  }}
  resetForm(form : NgForm){
    this.subsubAdminService.selectedStaff = {
      _id : '',
      firstName : '',
      middleName: '',
      lastName: '',
      gender:'',
      mobile:0,
      email : '',
      university : '',
      compass : '',
      professionalTitle:'',
      role: '',
      study: '',
      educationField: '',
      department : '',
      isViewed:false,
      workExperience:0,
      certificate:'',
      researchArea:'',
      futureResearchInterest:'',
      numberOfPublications:0,
      homeBase:'',
      latestEducationDocument:{
        data:''
      },
};
    form.resetForm();
    this.serverErrorMessage = '';
  }

  onLogout(){
    this.subsubAdminService.deletToken();
    this.router.navigate(['/login']);
  }

handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
registerFromExcelData(dataValues){
    this.subsubAdminService.postFromExcelFile(dataValues).subscribe(data => {
      this.showSucessMessage = true;
       setTimeout(() => this.showSucessMessage = false,4000);  
       
 },err => {
  if( err.status == 422){
    this.showServerError=true;
    this.serverErrorMessage = err.error.join('<br>');
    setTimeout(() => this.showServerError = false,4000);
  }
  else
    this.showServerError=true;
    this.serverErrorMessage = err.error.join('<br>');
    setTimeout(() => this.showServerError = false,4000);
});

  
  
  
}
univ:string = '';
myUniversity(){
  this.univ = this.subsubAdminService.getUserUniversity();
  return this.univ

}
comp:string = '';
myCompus(){
  this.comp = this.subsubAdminService.getUserCompass();
  return this.comp
 

}
onFileChange(evt: any) {
  let workBook = null;
  let jsonData = null;
  //const target : DataTransfer =  <DataTransfer>(evt.target);
  
  //if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  

const reader: FileReader = new FileReader();
  
  const file = evt.target.files[0];

  reader.onload = (event: any) => {
    const data = reader.result;

    workBook = XLSX.read(data,{ type: 'binary' , sheetRows:100});
    jsonData = workBook.SheetNames.reduce((initial, name) => {
      const sheet = workBook.Sheets[name];
      initial[name] = XLSX.utils.sheet_to_json(sheet);
      this.data = initial[name]
     // console.log(initial);
      return this.data;
    }, {});
    console.log(jsonData);

    let rawData = jsonData;
   // let dataValues = []; //For values
    let dataKeys = []; //For keys
    
    for(let key in rawData) {   //Pay attention to the 'in'
    this.dataValues.push(rawData[key]);
    dataKeys.push(key);
    }

    for(let d of this.dataValues) {
     // console.log("Staffs",d);
     
    }

  };

  reader.readAsBinaryString(file);

}

updateList(id: number, property: string, event: any) {
  const editField = event.target.textContent;
  this.data[id][property] = editField;
}

changeValue(id: number, property: string, event: any) {
  this.editField = event.target.textContent;
}

downloadFile() {
  this.subsubAdminService.downloadEmptyExcelFile().subscribe(
      res => {
          const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
          const file = new File([blob],this.fileName + '.xlsx', { type: 'application/vnd.ms.excel' });
          saveAs(file);
      },
      res => {
          // notify error
      }
  );
}

}



