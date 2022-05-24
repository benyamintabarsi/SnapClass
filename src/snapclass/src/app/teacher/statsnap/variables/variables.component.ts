import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { loadSnap, saveSnap, sendMessage, newSnap } from 'src/assets/js/snap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NavBarService } from 'src/app/services/navbar.service';
import { Router } from '@angular/router';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import * as CanvasJS from 'src/app/canvasjs/canvasjs.min';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css'] 
})
export class VariablesComponent implements OnInit {

  assignments: any[];

  students: any[];

  assignmentID: number;

  userID: any;

  section: any;

  sectionID: any;

  code: any[];

  checkSub: any;

  submission: any[];

  assignmentInfo: any[];

  goalUsage: any;

  constructor(
  	private apiService: APIService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private sectionService: ActiveSectionService,
    private navService: NavBarService) {}

  ngOnInit() {
  	this.submission = [];
  	this.goalUsage = 6;
  	this.assignmentInfo = [];
  	this.sectionID = this.sectionService.getActiveSection();
    this.getSectionInformation();

    setTimeout( () => {
      this.setSubmissionArray();
    }, 500);
  }

  getSectionInformation() {
    this.apiService.getSection(this.sectionID)
    .subscribe(res => {
      if (res["success"]) {
        this.section = res["section"];
      }
    });

    this.apiService.getAssignmentsForSection(this.sectionID)
    .subscribe(res => {
      if (res["success"]) {
        this.assignments = res["assignments"];
      }
    })

    this.apiService.getStudentsForSection(this.sectionID)
    .subscribe(res => {
      if (res["success"]) {
        this.students = res["students"];
      }
    })

  }

  
  setSubmission(studentID, assignmentID) {
  	var _this = this;
  	var sub;
    this.apiService.getSubmission(studentID, assignmentID)
    .subscribe(res => {
      if (res["success"]) {
        sub = res["submission"];
        _this.submission.push(sub.submission_code);
        _this.assignmentInfo.push(assignmentID);
      } else {
        _this.submission.push("null");
      }
    })

  }

  setSubmissionArray() {

  	for(let assignment of this.assignments){
  		for(let student of this.students){
  		  this.setSubmission(student.id, assignment.id);
  	    }
  	}

  }

  skillsData(){
  	var skills = [];
  	for(var j = 1; j <= this.assignments.length; j++){
  		var ID = j;
  		var sum = 0;
  		var students = 0;
  		for(var i = 0; i < this.assignmentInfo.length; i++){
  			if(this.assignmentInfo[i] == ID){
  				var varCount = this.submission[i].match(/variable>/g);
  				if(varCount != null){
  				    sum = sum + (varCount.length/2);
  				    console.log("Assignment " + ID + " has " + varCount.length/2 + " variables");
  			    }
  				students = students + 1;
  			}
  		}
  		if(students != 0){
  		    skills.push(sum/students);
  	    }
  	}
  	return skills;
  	
  }

  overallAverage(){
  	var skills = this.skillsData();
    var sum = 0;
  	for(var i = 0; i < skills.length; i++){
      sum = sum + skills[i];
  	}
  	return sum/skills.length;
  }

  defineUsageLevel(){

      var avg = this.overallAverage();
      var message = "";

      if(avg >= this.goalUsage){
        message = "meeting and surpassing your desired average usage of " + this.goalUsage + " variables per program. You're doing a great job and your students are progressing wonderfully. Keep up the good work!!";
      }
      else if(avg >= (this.goalUsage*0.75)){
      	message = "almost reaching your desired average usage of " + this.goalUsage + " variables per program. You're doing a great job and your students are progressing wonderfully. If you want to give them that last boost towards reaching the goal usage, you can find additional exercises HERE.";
      }
      else if(avg >= (this.goalUsage*0.5)){
      	message = "halfway towards reaching your desired average usage of " + this.goalUsage + " variables per program. You've done a great job in introducing this skill to your class, but it seems like they might need a bit of a boost towards reaching the goal usage. Consider reviewing this concept with them or using on of the additional exercises you can find HERE.";
      }
      else if(avg >= (this.goalUsage*0.25)){
      	message = "a quarter of the way towards reaching your desired average usage of " + this.goalUsage + " variables per program. You've done a great job in introducing this skill to your class, but it seems like they might need a bit of a boost towards reaching the goal usage. Consider reviewing this concept with them or using on of the additional exercises you can find HERE.";
      }
      else{
      	message = "struggling to use variables in their programs. You've done a great job in introducing this skill to your class, but it seems like they might need a bit of a boost towards reaching the goal usage. Consider reviewing this concept with them or using on of the additional exercises you can find HERE.";
      }

      return message;
  }


  graphCreation(){

  	  var varUse = this.skillsData();

      var names = [];
      for(var a = 0; a < varUse.length; a++){
      	names.push(String(a+1));
      }

      var dps = [];

      for(var i = 0; i < names.length; i++){
        dps.push({label: names[i], y: varUse[i]});
      }

      var chart = new CanvasJS.Chart("chartContainer",
	  { 
	  	title: {text: "Average Variable Usage Over Assignments", fontWeight: "bolder",},
 	  	axisX: [{title: "Assignment ID Number"}],
	    axisY: [{title: "Average Variables Per Assignment"}],       
        data: [
      {
        type: "area",
        lineThickness: 8,
         dataPoints: dps
      }
      ]
      });

      chart.render();

  }

}