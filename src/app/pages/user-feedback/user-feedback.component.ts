import { Component } from '@angular/core';

@Component({
  selector: 'app-user-feedback',
  standalone: true,
  imports: [],
  templateUrl: './user-feedback.component.html',
  styleUrl: './user-feedback.component.css'
})
export class UserFeedbackComponent {
  activeTab: string = 'Received';
 
  tabs: string[] = ['Received', 'Given', 'Pending Requests', 'Drafts'];
 
  setTab(tab: string) {
    this.activeTab = tab;
  }
}
