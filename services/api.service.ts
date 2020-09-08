import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private db: DatabaseService, private _http: HttpClient) { }
  

  async getTransactions() {
    const sql = 'SELECT * FROM transactions INNER JOIN categories ON transactions.category_id=categories.cat_id ORDER BY transactions.created_date DESC, transactions.id DESC'
    const result = await this.db.executeSQL(sql);

    const transactions = this.formmatTransactions(result.rows);
    return transactions;
  }

  public insert(transaction: Transaction) {
    const sql = 'insert into transactions (note, in_amount, out_amount) values (?,?,?)';
    const data = [transaction.note, transaction.in_amount, transaction.out_amount];

    return this.db.executeSQL(sql, data);
  }




  // ------------------------------------------------------------------------------------- //
  // ------------------------------------------------------------------------------------- //


  private formmatTransactions(rows: any) {
    const transactions: Transaction[] = []
    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      let transaction: any = [];
      transaction.id = item.id;
      transaction.note = item.note;
      transaction.in_amount = item.in_amount;
      transaction.out_amount = item.out_amount;

      transactions.push(transaction);
    }
    return transactions;
  }

}