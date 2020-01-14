import { Component } from "@angular/core";
import * as Survey from "survey-angular";
import { ActivatedRoute, Router } from "@angular/router";
//mport { Observable } from "rxjs";
//import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
// import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

var surveyJSON = {
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "html",
          name: "Comment",
          html:
            "<p>Target Group: People who had successful mid-career transition to the IT industry and currently in employment in IT industry.</p>\n\n<h1>Informed Consent</h1>\n\n<p>This interview is in the context of the research project “Key factors of Successful Mid-career Transition in the IT industry – Relevant in the New Zealand context”.</p>\n\n<p>I am going to ask you a few questions about the processes, job functions and skills in your organization. The data and results of this interview will be processed confidentially and will be used only for analysis and/or scientific presentations. You have the right to withdraw from this research at any time. Do you agree to participate in this research?</p>"
        },
        {
          type: "text",
          name: "Name",
          title: "Name",
          isRequired: true
        },
        {
          type: "radiogroup",
          name: "Gender",
          title: "Gender",
          isRequired: true,
          choices: ["Male", "Female"]
        },
        {
          type: "text",
          name: "Email",
          title: "Email"
        }
      ]
    },
    {
      name: "page2",
      elements: [
        {
          type: "radiogroup",
          name: "question5",
          title: "What is your age group?",
          isRequired: true,
          choices: [
            {
              value: "20-29",
              text: "20 - 29"
            },
            {
              value: "30-39",
              text: "30 - 39"
            },
            {
              value: "40-49",
              text: "40 - 49"
            },
            {
              value: "50-59",
              text: "50 - 59"
            },
            {
              value: ">60",
              text: "> 60"
            }
          ]
        }
      ]
    },
    {
      name: "page3",
      elements: [
        {
          type: "radiogroup",
          name: "question2",
          title: "What is the highest level of education you completed?",
          isRequired: true,
          hasOther: true,
          choices: [
            {
              value: "HighSchool",
              text: "High School"
            },
            "Diploma",
            {
              value: "BachelorDegree",
              text: "Bachelor's degree"
            },
            {
              value: "MasterDegree",
              text: "Master's degree"
            }
          ]
        }
      ]
    },
    {
      name: "page4",
      elements: [
        {
          type: "checkbox",
          name: "question6",
          title:
            "How did you acquire your knowledge and skills to transit to IT industry?",
          isRequired: true,
          hasOther: true,
          choices: [
            {
              value: "UniversityStudies",
              text: "University studies"
            },
            {
              value: "Self-studyOnlineCourses",
              text: "Self-study online courses"
            },
            {
              value: "TrainingCourses ",
              text: "Training courses that give certificates"
            },
            {
              value: "VocationalSchool",
              text: "Vocational school"
            }
          ],
          otherText: "Other (describe)"
        }
      ]
    },
    {
      name: "page5",
      elements: [
        {
          type: "radiogroup",
          name: "question3",
          title:
            "How important would you rate your past work experience in facilitating your transition to IT industry",
          isRequired: true,
          choices: [
            {
              value: "NotImportant",
              text: "Not important"
            },
            {
              value: "SlightlyImportant",
              text: "Slightly important"
            },
            {
              value: "ModeratelyImportant",
              text: "Moderately important"
            },
            {
              value: "VeryImportant",
              text: "Very important"
            }
          ]
        }
      ]
    },
    {
      name: "page6",
      elements: [
        {
          type: "comment",
          name: "question7",
          title: "Please state your past work experience",
          isRequired: true
        }
      ]
    },
    {
      name: "page7",
      elements: [
        {
          type: "multipletext",
          name: "question4",
          title:
            "How would you rank the importance of the following skills in your transition to IT industry? Rank ordered from 1 (lowest) to 3 (highest).",
          isRequired: true,
          items: [
            {
              name: "learning skills",
              inputType: "number",
              title:
                "learning skills (creativity and innovation, critical thinking and problem solving, presentation etc)",
              maxLength: 3,
              validators: [
                {
                  type: "numeric",
                  minValue: 1,
                  maxValue: 3
                }
              ]
            },
            {
              name: "literacy skills",
              inputType: "number",
              title: "literacy skills (information, media and ICT literacy)",
              maxLength: 3,
              validators: [
                {
                  type: "numeric",
                  minValue: 1,
                  maxValue: 3
                }
              ]
            },
            {
              name: "life skills",
              inputType: "number",
              title:
                "life skills (social, motivation, flexibility and adaptability, initiative and self-direction etc)",
              maxLength: 2,
              validators: [
                {
                  type: "numeric",
                  minValue: 1,
                  maxValue: 3
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "page8",
      elements: [
        {
          type: "multipletext",
          name: "question8",
          title:
            "How would you rank the importance of the following key attributes in your transition to IT industry? Rank ordered from 1 (lowest) to 3 (highest).",
          isRequired: true,
          items: [
            {
              name: "MotivationToChange",
              inputType: "number",
              title: "Motivation to change",
              validators: [
                {
                  type: "numeric",
                  minValue: 1,
                  maxValue: 3
                }
              ]
            },
            {
              name: "LearningAttitude",
              inputType: "number",
              title: "Learning attitude",
              maxLength: 3,
              validators: [
                {
                  type: "numeric",
                  minValue: 1,
                  maxValue: 3
                }
              ]
            },
            {
              name: "Age",
              inputType: "number",
              title: "Age",
              maxLength: 3,
              validators: [
                {
                  type: "numeric",
                  minValue: 1,
                  maxValue: 3
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "page9",
      elements: [
        {
          type: "radiogroup",
          name: "question11",
          title:
            "What you feel is the biggest challenge in changing career to IT industry",
          isRequired: true,
          hasOther: true,
          choices: [
            {
              value: "IdentifyingSkillsGaps",
              text: "Identifying your skills gaps"
            },
            {
              value: "UnawarenessOfJobRequirements ",
              text: "Unawareness of job requirements "
            },
            {
              value: "CombiningStudyingAndFamilyLife",
              text: "Combining studying and family life"
            },
            {
              value: "DifficultiesOfLearningNewSkills ",
              text: "Difficulties of learning new skills "
            },
            "Finance"
          ]
        }
      ]
    },
    {
      name: "page10",
      elements: [
        {
          type: "checkbox",
          name: "question9",
          title: "What are the main reason(s) to change career to IT industry",
          isRequired: true,
          hasOther: true,
          choices: [
            {
              value: "VarietyOfJobPositions",
              text: "Variety of job positions"
            },
            {
              value: "CareerOpportunities",
              text: "Career opportunities"
            },
            {
              value: "NewChallenge",
              text: "New challenge"
            },
            {
              value: "BetterPay",
              text: "Better pay"
            },
            {
              value: "SecuredJob",
              text: "Secured job"
            },
            {
              value: "BetterWorkLifeBalance",
              text: "Better work-life balance"
            }
          ]
        }
      ]
    },
    {
      name: "page11",
      elements: [
        {
          type: "checkbox",
          name: "question13",
          title:
            "What are the main obstacles/barriers you encountered in securing a job in IT industry?",
          isRequired: true,
          hasOther: true,
          choices: [
            "Ageism",
            {
              value: "FamilyResponsibilities",
              text: "Family responsibilities"
            },
            {
              value: "Uncertainty/FearOfNewCareer",
              text: "Uncertainty/fear of new career"
            }
          ]
        }
      ]
    },
    {
      name: "page12",
      elements: [
        {
          type: "checkbox",
          name: "question10",
          title:
            "If you are planning to get education/training to learn needed skills which kind of training/education would you prefer or have already taken?",
          isRequired: true,
          hasOther: true,
          choices: [
            {
              value: "UniversityStudies",
              text: "University studies"
            },
            {
              value: "Self-studyOnlineCourses",
              text: "Self-study online courses"
            },
            {
              value: "TrainingCoursesWhichWillNotGiveADegree",
              text: "Training courses which will not give a degree"
            },
            {
              value: "VocationalSchool",
              text: "Vocational school"
            }
          ]
        }
      ]
    },
    {
      name: "page13",
      elements: [
        {
          type: "radiogroup",
          name: "question15",
          title:
            "Was there supports from government or companies when you made mid-career transition?",
          isRequired: true,
          choices: ["Yes", "No"]
        }
      ]
    },
    {
      name: "page14",
      elements: [
        {
          type: "radiogroup",
          name: "question12",
          title:
            "Do you think it would be easier to get a job after a mid-career transition?",
          isRequired: true,
          choices: ["Yes", "No"]
        }
      ]
    }
  ],
  showProgressBar: "bottom"
};

function sendDataToServer(survey) {
  survey.sendResult("1d861ab1-52a7-4172-8c3f-0182be573fc9"); //setTimeout(refreshPage, 3000);
} //window.location.href = "home";

//function refreshPage() {
//}

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private http: HttpClient) {}
  jsonData: string;

  ngOnInit() {
    var survey = new Survey.Model(surveyJSON);
    survey.onComplete.add(sendDataToServer);
    survey.onCompleting.add(function(sender, options) {
      options.allowComplete = confirm("Do you want to complete the survey?");
    });
    Survey.SurveyNG.render("surveyElement", { model: survey });

    /* This is for the app for android to look for internet to get the information
    let json = this.http
    .get(
      "https://api.dxsurvey.com/api/Survey/getSurvey?surveyId=98e3e441-23af-4825-9d3e-9fa445cbfaf3"
    )
    .subscribe(res => {
      this.jsonData = JSON.stringify(res);
      //var survey = new Survey.Model(surveyJSON);
      var survey = new Survey.Model(this.jsonData);
          survey.onComplete.add(sendDataToServer);

      survey.onCompleting.add(function(sender, options){
        options.allowComplete = confirm("Do you want to complete the survey?");
      });

          Survey.SurveyNG.render("surveyElement", { model: survey });
    });
        */
  }
}
