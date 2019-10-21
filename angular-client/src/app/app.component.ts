import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from './event.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-client';
  events: any[];

  displayedColumns: string[] = ['event_summary','event_type','event_date','event_size'];
  dataSource = new MatTableDataSource<any[]>([]);
  isLoading:boolean=false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  
  constructor(private eventService:EventService) { }
 
  ngOnInit()
  {
    
    this.isLoading=true;
    /* this.eventService.getEvents()
    .subscribe(data => {this.events = data;
    
      this.dataSource = new MatTableDataSource<any[]>(this.events);
      this.isLoading=false;
      this.dataSource.paginator = this.paginator;
    }
    );*/
  }
}
