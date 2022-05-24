import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service'
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Rubric } from 'src/app/models/rubric.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { addAccordion } from '../../../assets/js/accordion';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';
import { NavBarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-rubric-page',
  templateUrl: './rubric-page.component.html',
  styleUrls: ['./rubric-page.component.css']
})
export class RubricPageComponent implements OnInit {

  /**
   * Constructor dependendicies
   * @param apiService
   * @param route
   * @param alertService
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private tutorialService: TutorialService,
    private navService: NavBarService,
    public router: Router) { }

  waitFor = (ms) => new Promise(r => setTimeout(r, ms));

  /**
   * Current user
   */
  user: User;

  /**
   * rubric id
   */
  rubricId: number;

  /**
   * rubric variable
   */

  rubric: Rubric;

  /**
   * list of category ids
   */
  categoryIds: any[];

  /**
   * list of category objects
   */
  categoryList: any[];

  /**
   * list of points
   */
  pointsList: any[];

  /**
   * Toggle enable to edit rubric
   */
  edit: boolean;

  /**
   * Toggle specific category
   */
  categoryId: number;

  /**
   * Toggle enable to edit category
   */
  categoryEdit: boolean;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;

  /**
   * Rubric form
   */
  rubricForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    user_id: new FormControl(''),
    is_template: new FormControl('')

  })

  categoryPointsForm = new FormGroup({
    name: new FormControl(''),
    learning_objective: new FormControl(''),
    points: new FormArray([
      new FormControl('')
    ])
  });
  /**
   * Category form
   */
  categoryForm = new FormGroup({
    name: new FormControl(''),
    learning_objective: new FormControl(''),
    min_point: new FormControl(''),
    max_point: new FormControl(''),
    point_scale: new FormControl('')
  })

  /**
   * Points form
   */
  pointsForm = new FormArray([
    new FormControl(''),
    new FormControl(''),
  ])

  ngOnInit() {
    this.edit = false;
    this.categoryEdit = false;
    this.user = this.authService.getUser();
    //if they are not a teacher
    if((this.user["data"]["account_type"]) != 1){
        this.authService.logout();
        this.navigate('/');
    }
    else{
        this.route.params.subscribe(params => {
            this.rubricId = +params['id'];
            this.getRubric();
        });
        this.tutorialStatus = this.tutorialService.getTutorialStatus();
        this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
        if (this.tutorialStatus > 0) {
          this.navService.openNav();
        }

    }
  }

  /**
   * Gets the current status of the tutorial
   */
  getTutorialStatus(): any {
    return this.tutorialService.getTutorialStatus();
  }

  /**
   * Gets the current status of the tutorial
   */
  getTutorialSubStatus(): any {
    return this.tutorialService.gettutorialSubStatus();
  }

  /**
   * Get rubric information
   */
  getRubric() {
    var _this = this;
    this.categoryIds = [];
    this.apiService.getRubric(this.rubricId)
      .subscribe(res => {
        if (res["success"]) {
          this.initCategories();
          _this.rubric = new Rubric(res["rubric"]);
          console.log(this.rubric);
          this.rubricForm.setValue({
            name: this.rubric.name,
            description: this.rubric.description,
            is_template: this.rubric.is_template,
            user_id: this.rubric.user_id
          });
        } else {
          this.alertService.setErrorHTML(res["message"]);
        }
        addAccordion();
      });
  }
  /**
   * Initialize category data
   */
  initCategories() {
    var _this = this;
    _this.categoryList = [];
    this.apiService.getRubricsCategories(this.rubricId)
      .subscribe(res => {
        if(res['success']) {
          res['categories'].forEach(category => {
            _this.categoryList.push(new Category(category));
          })
        }
        addAccordion();
      })
  }

  /**
   * Enable edit rubric information
   */
  toggleEdit() {
    this.edit = !this.edit;
  }

  /**
   * Submits rubric edits
   */
  editRubric() {
    this.apiService.putRubric(this.rubricId, this.rubricForm.value)
      .subscribe(res => {
        if(res["success"]) {
          this.apiService.getRubric(this.rubricId)
            .subscribe(res => {
              if (res["success"]) {
                this.rubric = new Rubric(res["rubric"]);
                this.toggleEdit();
              }
            });
        } else {
          this.alertService.setErrorHTML(res["message"]);
        }
      });
  }

  /**
   * Delete selected category
   */
  deleteCategory(id, num) {
      var i = num;

      setTimeout( () => {
          $("#poppers"+i).hide();
     }, 50);


    this.apiService.deleteCategory(id)
      .subscribe(res => {
        if(res["success"]) {
          this.alertService.setSuccessHTML(res["message"]);
        } else {
          this.alertService.setErrorHTML(res["message"]);
        }
    });

    setTimeout( () => {
       $("#button"+i).parent().addClass("deleted fadeOut");
   }, 100);

    setTimeout( () => {
        this.initCategories();
    }, 500);





  }

  /**
   * Update list of categories with category is added
   *
   * THIS HAS BEEN EDITED, NEVER USED?
   */
  updateCategoryList() {
    this.initCategories();
  }

  /**
   * Sets the new status for the tutorial.
   * @param status the number indicating the status of the tutorial
   * @param subStatus the number indicating the substatus of the tutorial
   */
  setTutorialStatus(status, subStatus) {
    this.tutorialService.setTutorialStatus(status, subStatus);
    this.tutorialStatus = this.tutorialService.getTutorialStatus();
    this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
  }

  //used to navigate
  navigate(url) {
    this.router.navigateByUrl(url);
  }
}
