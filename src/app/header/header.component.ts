import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})

export class HeaderComponent {
  collapsed = true;

  constructor(private dsService: DataStorageService) { }

  onSaveData() {
    this.dsService.storeRecipes();
  }

  onFecthData() {
    this.dsService.fetchRecipes();
  }
}
