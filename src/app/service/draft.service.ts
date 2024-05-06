import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  drafts: any[]=[]


  getResume(draft: any) {
    this.drafts.push(draft)
    console.log(this.drafts);

  }
}
