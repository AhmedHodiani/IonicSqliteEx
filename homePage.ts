import { Component } from '@angular/core';
import { DatabaseService } from '../../services/core/database.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  transactions: any = [];

  constructor(
    private _apiService: ApiService,
    private db: DatabaseService) { }
    


  ionViewWillEnter() {
    // only if the database is ready to go!!!
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadTransactions();
      }
    });
  }



  async loadTransactions() {
    this.transactions = await this._apiService.getTransactionsHome();
  }
}
