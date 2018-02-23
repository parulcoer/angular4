import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class LeaderService {

  constructor() { }
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
    return Observable.of(LEADERS).delay(2000);
    
  }

  getLeader(id: Number): Observable<Leader>{
    return Observable.of(LEADERS.filter(( leader ) => ( leader.id === id ))[0]).delay(2000);
    
  }

  getFeaturedLeader(): Observable<Leader>{
    return Observable.of(LEADERS.filter((leader) => (leader.featured))[0]).delay(2000);
  }

}
