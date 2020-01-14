import { Component } from '@angular/core';
import * as Survey from "survey-angular";
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { options } from 'knockout';
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/do";
// import "rxjs/add/operator/catch";

var surveyJSON = {pages:[{name:"page1",elements:[{type:"rating",name:"question1",title:"Happy?"},{type:"text",name:"fullname",title:"Full Name"},{type:"dropdown",name:"color",title:"What is your favourite colour?",hasOther:true,choices:[{value:"red",text:"Red"},{value:"green",text:"Green"},{value:"yellow",text:"Yellow"}]}]}]}

function sendDataToServer(survey) {
  survey.sendResult('1d861ab1-52a7-4172-8c3f-0182be573fc9');

    //setTimeout(refreshPage, 3000);
  }
  
  //function refreshPage() {
    //window.location.href = "home";
  //}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HttpClient) {}
  jsonData: string;

  ngOnInit() {
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
        
      }
}
