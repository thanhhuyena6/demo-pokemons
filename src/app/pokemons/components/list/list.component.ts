import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import type {PaginatorState} from '../../../components/paginator/paginator.component';
import {BackendService} from "../../../services/backend.service";
import {Pokemon} from "../../../models/pokemon";
import {PaginatorService} from "../../../services/paginator.service";

@Component({
    selector: 'pokemon-list',
    template: `
        <paginator
                [currentPage]="this.currentPage"
                [rowsPerPageOptions]="[10, 20, 40, 80]"
                [rows]="20"
                [totalRecords]="count"
                (onPageChange)="onPageChanged($event)"
        ></paginator>
        <input
                type="text"
                class="w-2/4 p-2 rounded border border-gray-600"
                placeholder="Filter by pokemon name..."
                [formControl]="query"
        />
        <data-table [isLoading]="false" [data]="data"></data-table>
    `,
})
export class ListComponent implements OnInit {
    data : Pokemon [];
    query = new FormControl('');
    dataPaginator: any;
    count: number;
    currentPage: number;

    constructor(private backendService: BackendService,
                private paginatorService: PaginatorService) {
    }

    ngOnInit() {
        this.getDataTable(20, 0);
        this.currentPage = 1;
        this.paginatorService.paginator.subscribe((offset:any) => {
            this.getDataTable(20, offset)
        })
    }

    onPageChanged(paginatorState: PaginatorState) {
        console.log(paginatorState);
        this.currentPage = paginatorState.page;
        let offset = paginatorState.first - 20;
        this.paginatorService.paginator.next(offset)
    }

    getDataTable(limit: number, offset: number) {
        this.backendService.getPokemons(limit, offset).subscribe((res: any) => {
            this.data = res.results;
            this.dataPaginator = res;
            this.count = res.count;
        })
    }
}
