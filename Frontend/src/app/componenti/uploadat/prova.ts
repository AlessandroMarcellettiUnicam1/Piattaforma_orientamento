import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    leftNumber: number = 0;
  
  nextNumber: number=0;

  calculateNextNumber() {
    if (this.leftNumber) {
      this.nextNumber = this.leftNumber + 1;
    } else {
      this.nextNumber = -1;
    }
  }
}