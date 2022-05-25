import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradebookComponent } from 'src/app/teacher/gradebook/gradebook.component';

import { APIService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavBarService } from 'src/app/services/navbar.service';
import { ActiveSectionService } from 'src/app/services/active-section.service';

import { routeNames } from 'src/app/services/routing.service';

import * as CanvasJS from 'src/app/canvasjs/canvasjs.min';



@Component({
  selector: 'app-gradedist',
  templateUrl: './gradedist.component.html',
  styleUrls: ['./gradedist.component.css'] 
})
export class GradeDistComponent implements OnInit {
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService,
    private navService: NavBarService,
    private sectionService: ActiveSectionService,
    public router: Router) {}


  gradebook: any[];

  section: any;

  sectionID: any;

  assignments: any[];

  gradeRange: any[] = [60, 70, 80, 90];


  ngOnInit() {
    this.sectionID = this.sectionService.getActiveSection();
    this.getSectionInformation();
    this.getGradebook();

  }

  /*Most of the following three functions allow for the section and gradebook to be accessed*/

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
  }

  getGradebook() {
    this.apiService.getSectionGrades(this.sectionID)
    .subscribe(res => {
      if (res["success"]) {
        this.gradebook = res["gradebook"];
      }
    })
  }

/* getGradeAverage calculates the average assignement grade for each of the students in the roster*/
  
getGradeAverage() {
    var gradelist = [];
    for (let student of this.gradebook){
      var value = null;
      var count = null;
      var average = null;
      for (let assignment of this.assignments){
        if (student.grades) {
          student.grades.forEach(grade => {
            if (grade.assignment == assignment.id && grade.grade) {
              value = value + grade.grade;
              count = count + 1
            }
          });
        }
      }
      if (count > 0){
        average = value/count;
      }
      if (average) gradelist.push(average);
    }
    return gradelist;
}

increaseGradeRange(index){
  if(this.gradeRange[index] < 100){
    if(index != 3 && this.gradeRange[index] < this.gradeRange[index+1]-1){
      this.gradeRange[index] += 1;
    }
    else if(index == 3){
      this.gradeRange[index] += 1;
    }
  }
}
decreaseGradeRange(index){
  if(this.gradeRange[index] > 0){
    if(index != 0 && this.gradeRange[index] > this.gradeRange[index-1]+1){
      this.gradeRange[index] -= 1;
    }
    else if(index == 0){
      this.gradeRange[index] -= 1;
    }
  }
}
resetGradeRange(){
  this.gradeRange = [60, 70, 80, 90];
}

/*getGradeDistribution sections each student (based on their average assignment grade) into a 5-point section*/

getGradeDistribution(){
	var gradelist = this.getGradeAverage();
	var gradedist = null;
	if(gradelist != null){
	  gradedist = [0, 0, 0, 0, 0]
      for (var i = 0; i < gradelist.length; i++){
        if(gradelist[i] >= this.gradeRange[3]){
          gradedist[4] += 1;
        }
        else if(gradelist[i] >= this.gradeRange[2]){
          gradedist[3] += 1;
        }
        else if(gradelist[i] >= this.gradeRange[1]){
          gradedist[2] += 1;
        }
        else if(gradelist[i] >= this.gradeRange[0]){
          gradedist[1] += 1;
        }
        else{
          gradedist[0] += 1;
        }
      }
    return gradedist;
  }
}

  /*getClassAverage calculates the overall grade average for the class*/

  getClassAverage(){
  	var grades = this.getGradeAverage();
  	var sum = 0;
  	var num = grades.length;

  	for(var i = 0; i < grades.length; i++){
  		sum += grades[i]
  	}

  	var avg = sum/num;
  	return Math.round(avg*100)/100;
  }

  /*graphCreation takes the data from getGradeDistribution and puts it into a graph which can be called in the html file */

  graphCreation(){

      var letters = ["F: 0 - " + this.gradeRange[0], "D: " + this.gradeRange[0] + " - " + this.gradeRange[1], "C: " + this.gradeRange[1] + " - " + this.gradeRange[2], "B: " + this.gradeRange[2] + " - " + this.gradeRange[3], "A: " + this.gradeRange[3] + " - 100"];
  
      var gradedist = this.getGradeDistribution();

      var dps = [];

      for(var i = 0; i < letters.length; i++){
        dps.push({label: letters[i], y: gradedist[i]});
      }

      var chart = new CanvasJS.Chart("chartContainer",
	  { 
	  	title: {text: "Grade Distribution", fontWeight: "bolder",},
 	  	axisX: [{title: "Grade Range"}],
	    axisY: [{title: "Number of Students"}],       
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