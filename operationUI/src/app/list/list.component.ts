import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CloudPortalService } from '../cloud-portal.service';
import { FormBuilder, FormGroup, Validators,NgForm  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

export interface Element {
  id: number;
  name: string;
  
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  loginForm: FormGroup;
  userData: any[];
  public dataSource: any[];
  submitted = false;

  constructor(private cloudservice: CloudPortalService,
    private router: Router,
    private formBuilder: FormBuilder) { 
    this.dataSource = new Array();
  }
  
  ngOnInit() {
    this.cloudservice.getAllMembers()
      .subscribe( members => {
        
        this.userData = members;
        
        this.dataSource= [];
        this.userData.forEach(members =>{
          this.dataSource.push({
            name: members.TeamMember
          });
        });
      });

      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
  }
    console.log("submit button clicked", this.f.username.value);
    localStorage.setItem("user",this.f.username.value);
    this.router.navigate(['/projects']);
  }

}


