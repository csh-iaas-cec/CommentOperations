import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CloudPortalService } from '../cloud-portal.service';
import {ExportService} from '../export.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DatePipe } from '@angular/common';


export interface Element {
  SR: any;
  EngagementName: any;
  OpportunityID: any;
  CustomerName: any;
  OpportunityOwner: any;
  Hours: any;
  highlighted?: boolean;
  hovered?: boolean;
  TeamMember:any;
  Comment:any;
  RevenueType:any;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectsComponent implements OnInit {

  userData: any[]
  public dataSource:any[];
  displayedColumns: any[] = ['SR','EngagementName','OpportunityID','CustomerName','OpportunityOwner','Hours'];
  displayColumns: any[] = ['SR', 'EngagementName','CustomerName','OpportunityID','TeamMember','Comment','RevenueType','Date'];
  matTableSource: MatTableDataSource<any>;
  count:any = 0;
  comment:any;
  srNum:any;
  isSubbu:any=false;
  fdate:any;
  

  constructor(private cloudservice: CloudPortalService,private exportService: ExportService, public datepipe: DatePipe) { 
    this.dataSource = new Array();
  }

  currentUser: any

  ngOnInit() {
    this.currentUser = localStorage.getItem("user")
    if(this.currentUser.includes("Subramanian Viswanathan")){
      console.log("current user Subbu", this.currentUser)
      this.isSubbu = true;
      this.cloudservice.getEnOfUser(this.currentUser)
        .subscribe(data => {
            this.userData = data;
            this.dataSource = [];
            this.userData.forEach(data => {
              console.log("date",data.DateUpdated)
              this.fdate = this.datepipe.transform(data.DateUpdated , 'dd-MM-yyyy')
              console.log(this.fdate);
              this.dataSource.push({
                SR : data.SRNumber,
                EngagementName : data.SRTitle,
                CustomerName : data.CustomerName,
                OpportunityID : data.OpportunityID,
                TeamMember : data.TeamMember,
                Comment : data.comment,
                RevenueType : data.RevenueType,
                Date : this.fdate
               });
            });
      this.matTableSource = new MatTableDataSource(this.dataSource);
      
    });
    }
    else{
      this.isSubbu=false;
      this.cloudservice.getEnOfUser(this.currentUser)
        .subscribe(data => {
            this.userData = data;
            this.dataSource = [];
            this.userData.forEach(data => {
              this.dataSource.push({
                SR : data.SRNumber,
                EngagementName : data.SRTitle,
                OpportunityID : data.OpportunityID,
                CustomerName : data.CustomerName,
                OpportunityOwner : data.OO,
                Comment : data.comment,
                Hours : data.ReportedHours
               });
            });
      this.matTableSource = new MatTableDataSource(this.dataSource);
      console.log("data source", this.dataSource)
    });
    }
    
  }
  highlight(element: Element) {
    element.highlighted = !element.highlighted;
  }
  applyFilter(filterValue: String) {
    this.matTableSource.filter = filterValue.trim().toLowerCase();
  }
  getComments(){
    console.log("comment value", this.comment);
    console.log("SR",this.srNum);
    this.cloudservice.submitComments(this.currentUser,this.srNum,this.comment)
    this.comment = null;
  }
  onSelect(selectedItem: any) {
    console.log("Selected item Id: ", selectedItem.SR); // You get the Id of the selected item here
    this.srNum = selectedItem.SR;
}
export() {
  console.log("export service");
  this.exportService.exportExcel(this.dataSource, 'data');
}



}
