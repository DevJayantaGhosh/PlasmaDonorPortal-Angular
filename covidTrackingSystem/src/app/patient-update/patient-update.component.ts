import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../model/Patient';
import { PatientserviceService } from '../patientservice.service';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent implements OnInit {

  constructor(private router: Router, private pService: PatientserviceService) {
    this.Pid = <Number>this.router.getCurrentNavigation().extras.state;
	//in router,module.ts---> path: 'admin/quiz/:qid /:title'  <- this name should be same as in the component for  extracting time
	//pass through url --> [router-link]="'/admin/quiz'+ q.qidData"
	// private _router:ActivatedRoute
	//this.Pid=this._router.snapshot.params.qid;
	//USE FILTER AFTER UPDATE 

  }

  ngOnInit(): void {
    this.loadSingleExitingPatient();
  }
  Pid: Number = new Number();
  patientUpdateModel: Patient = new Patient();
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";


  loadSingleExitingPatient() {
    this.pService.getSinglePatientById(this.Pid).subscribe(res => {
      this.patientUpdateModel = res;
    })
  }
  msg: any;
  onUpdatePatient() {
    this.pService.updatePatient(this.patientUpdateModel).subscribe(res => {
      this.msg = res;

    })
    this.router.navigate(['/home'])
  }

}
