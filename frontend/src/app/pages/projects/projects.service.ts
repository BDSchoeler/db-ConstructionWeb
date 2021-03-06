import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class ProjectsService {

constructor (private http: Http) {}

getProjects(){
    return this.http.get('http://localhost:8080/projects').toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
}

getProject(id){
  return this.http.get('http://localhost:8080/projects/' +id).toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
}
getProjectByEmail(email){
  return this.http.get('http://localhost:8080/projects/email/' +email).toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
}
/*addProject(project){
  return this.http.post('http://localhost:8080/projects/',project).toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);

}*/

 updateStatus(status, id)
    {
        return this.http.put('http://localhost:8080/projects/'+id, {'status':status}).toPromise();
    }

    updatePhase(phase, id)
    {
        return this.http.put('http://localhost:8080/projects/phase/'+id, {'currentPhase':phase}).toPromise();
    }

addProject(location, type, size, email, userType)
{
  console.log("project trying to add");
return this.http.post('http://localhost:8080/projects/',{'email':email,'projectType':type, 'Size':size, 'location':location}).toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);

}



  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
    private handleError (error: Response | any) {
    
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
