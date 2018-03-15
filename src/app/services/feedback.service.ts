import { Feedback } from './../shared/feedback';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

@Injectable()
export class FeedbackService {
  // fbcopy = null;
  constructor(private restangular: Restangular,
    private ProcessHttpmsgService: ProcessHttpmsgService) { }

    submitFeedback(feedback: Feedback): Observable<Feedback> {

      return this.restangular.all('feedback').post(feedback);

      }
}
