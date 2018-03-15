import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
    private processHTTPmsgService: ProcessHttpmsgService) { }
  /*getLeaders(): Promise<Leader[]>{
    return new Promise(resolve=> {
      setTimeout(() => resolve(LEADERS),2000);
    });
  }

  getLeader(id: Number): Promise<Leader>{
    return new Promise(resolve=> {
      setTimeout(() => resolve(LEADERS.filter(( leader ) => ( leader.id === id ))[0]),2000);
    });
  }

  getFeaturedLeader(): Promise<Leader>{
    return new Promise(resolve=> {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.featured))[0]) , 2000);
    });
  }
  observable to promise
  getLeaders(): Promise<Leader[]>{
    return Observable.of(LEADERS).delay(2000).toPromise();
    
  }

  getLeader(id: Number): Promise<Leader>{
    return Observable.of(LEADERS.filter(( leader ) => ( leader.id === id ))[0]).delay(2000).toPromise();
    
  }

  getFeaturedLeader(): Promise<Leader>{
    return Observable.of(LEADERS.filter((leader) => (leader.featured))[0]).delay(2000).toPromise();
  }*/
  getLeaders(): Observable<Leader[]>{
    //return Observable.of(LEADERS).delay(2000);
    return this.restangular.all('leaders').getList();
    
  }

  getLeader(id: Number): Observable<Leader>{
   // return Observable.of(LEADERS.filter(( leader ) => ( leader.id === id ))[0]).delay(2000);
   return  this.restangular.one('leaders',id).get();
    
  }

  getFeaturedLeader(): Observable<Leader>{
    //return Observable.of(LEADERS.filter((leader) => (leader.featured))[0]).delay(2000);
    return this.restangular.all('leaders').getList({featured: true})
      .map(leaders => leaders[0]);
  }

}
