import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, from, Subject, concat, Subscriber, Subscription } from 'rxjs';
// import { merge } from 'rxjs/operators';
import { BanksService } from '../services/banks.service';
import { Bank } from '../model/bank.model';


// TODO: Replace this with your own data model type
// export interface DatatableItem {
//   name: string;
//   id: number;
// }

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: DatatableItem[] = [
// { id: 1, name: 'Hydrogen' },
// { id: 2, name: 'Helium' },
// { id: 3, name: 'Lithium' },
// { id: 4, name: 'Beryllium' },
// { id: 5, name: 'Boron' },
// { id: 6, name: 'Carbon' },
// { id: 7, name: 'Nitrogen' },
// { id: 8, name: 'Oxygen' },
// { id: 9, name: 'Fluorine' },
// { id: 10, name: 'Neon' },
// { id: 11, name: 'Sodium' },
// { id: 12, name: 'Magnesium' },
// { id: 13, name: 'Aluminum' },
// { id: 14, name: 'Silicon' },
// { id: 15, name: 'Phosphorus' },
// { id: 16, name: 'Sulfur' },
// { id: 17, name: 'Chlorine' },
// { id: 18, name: 'Argon' },
// { id: 19, name: 'Potassium' },
// { id: 20, name: 'Calcium' },
// ];

/**
 * Data source for the Datatable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class DatatableDataSource extends DataSource<Bank>  {

  // Use ALWAYS data to modify table's content
  data: Bank[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  length = this.data.length;
  private N = 20;

  data$: Subject<Bank[]>;


  constructor(private _banksService: BanksService) {
    super();
    this.data$ = new Subject<Bank[]>();
  }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Bank[]> {
    const dataMutations = [
      // Observes data modifications
      // this.data$.asObservable(),
      this._banksService.getData$().pipe(
        map(data => this.data = data)
      ),
      // Initialices the datatable (called only once)
      this._banksService.getAllBanks().pipe(
        map(data => this.data = data)
      ),
      this.sort.sortChange,
      this.paginator.page
    ]

    return merge(...dataMutations).pipe(
      map(() => this.getPagedData(this.getSortedData([...this.data])))
    );
  }


  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {

  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Bank[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Bank[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

