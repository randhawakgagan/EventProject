import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { EventService } from '../event.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
//import {MatDatepickerModule} from '@angular/material/datepicker';
//import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NativeDateModule } from '@angular/material';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface range {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'popup-dialog',
  template: '<p style="height:300px"><b>Event Metric : {{data.EventId}}<br>  </b><b>Event Details</b> :{{ data.EventDetails}}</p>',
})
export class Dialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: any[];
  startDate:Date;
  stDate:Date;
  endDate:Date;
  displayedColumns: string[] = ['event_size','event_summary','event_type','event_date'];
  dataSource = new MatTableDataSource<any[]>([]);
  isLoading:boolean=false;

public dataRequestForm:FormGroup;
public startView:string;
public readonly TIME_PERIOD_WEEK_ID:string = 'w';
public readonly TIME_PERIOD_MONTH_ID:string = 'm';
public readonly TIME_PERIOD_QUARTER_ID:string = 'q';
public dataRequestObject:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  eventDetails: any;

  constructor(private eventService:EventService,private fb:FormBuilder,private router:Router,public dialog: MatDialog) { }
 
  navigateTo(row: any) {
    this.eventService.getEventDetails(row.event_size)
    .subscribe(data => {
      this.eventDetails = data.EventDetails;
    
      let dialogRef = this.dialog.open(Dialog, {
        data: {EventDetails:this.eventDetails,EventId:row.event_size}
      });
    });
    
    //this.router.navigate(['/event_details/'+row.event_size]);
  } 
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate= event.value;
  }

  public createForm() {
    let date = new Date();
    return this.fb.group({
      'startDate':new FormControl({value:new Date(),disabled:true}),
      'timePeriodId':new FormControl('w'),
      'endDate':new FormControl(new Date(date.setDate(date.getDate()+7)))
    })
  }

  public submitDataRequestForm() {

    let startDate =  this.dataRequestForm.get('startDate').value;
    let timePeriodId = this.dataRequestForm.get('timePeriodId').value;

    this.dataRequestObject = {"startDate":startDate.toLocaleString(),"timePeriodId":timePeriodId};
    this.isLoading=true;
    this.events=[];
    this.eventService.getEvents(startDate,timePeriodId)
   .subscribe(data => {this.events = data.Data;
    this.stDate=data.StartDate;
    this.endDate=data.EndDate;
     this.dataSource = new MatTableDataSource<any>(this.events);
     this.isLoading=false;
     this.dataSource.paginator = this.paginator;

   }
   );

  }
  onTimePeriodSelect($event) {
   // this.disableNextAndPrevious = true;
    if(this.dataRequestForm.value.timePeriodId == this.TIME_PERIOD_WEEK_ID) {
      this.startView = "month";
    }else{
      this.startView = "year";
      let date = new Date(this.dataRequestForm.get('startDate').value);
      let newDate = new Date(date.setDate(1));
      this.dataRequestForm.get('startDate').setValue(newDate);
    }
    
  }
  chosenMonthHandler(normalizedMonth: NativeDateModule, datepicker: MatDatepicker<NativeDateModule>) {
   // this.disableNextAndPrevious = true;
    if(this.startView == "year")
      {
        this.dataRequestForm.get('startDate').setValue(normalizedMonth);
        datepicker.close();
      }
  }
  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
   // this.disableNextAndPrevious = true;
  }

  ngOnInit()
  {
    this.dataRequestObject = {};
   // this.disableNextAndPrevious = true;
    this.dataRequestForm = this.createForm();
    this.startView = "month";
    
   
  }

}
