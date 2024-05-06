import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DraftService } from '../service/draft.service';

@Component({
  selector: 'app-draft',
  standalone: true,
  imports: [SideBarComponent, CommonModule, MatSnackBarModule],
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.scss'
})
export class DraftComponent {

  route = inject(Router)
  snackBar = inject(MatSnackBar)
  draftservice = inject(DraftService)

  draftStorage: any[] = []
  drafts: any[] = []

  ngOnInit(): void {
    const draftDisplay: any[] = []
    this.draftStorage = JSON.parse(localStorage.getItem('draft')!) || []
    // console.log(this.draftStorage);
    this.draftStorage.forEach((element, index, array) => {
      // console.log(...element.draft);
      if (element.draft != null) {
        draftDisplay.push(...element?.draft)
      }
    })
    // console.log(draftDisplay);
    this.drafts = draftDisplay
    // console.log(this.drafts);
    if (draftDisplay.length === 0) {
      this.drafts = this.draftStorage
    }
    // this.drafts.push(...JSON.parse(localStorage.getItem('draft')!) || [])
  }

  removeDraft(index: number): void {
    this.drafts.splice(index, 1)
    localStorage.setItem('draft', JSON.stringify(this.drafts))
  }

  resumeDraft(draft: any, index: number): void {
    this.route.navigate(['pos'], { state: { drafts: draft } });
    this.drafts.splice(index, 1)
    localStorage.setItem('draft', JSON.stringify(this.drafts))
    this.snackBar.open('Order is Resume', 'Resume', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    })

    // this.draftservice.getResume(draft)
    // this.route.navigateByUrl('pos')
  }

  eachProductPrice(draft: any) {
    return draft.sellingPrice * draft.q
  }




}
