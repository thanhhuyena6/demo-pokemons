import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import type {PaginatorState} from '../../../components/paginator/paginator.component';
import {BackendService} from "../../../services/backend.service";
import {Pokemon} from "../../../models/pokemon";

@Component({
    selector: 'pokemon-list',
    template: `
        <paginator
                [currentPage]="1"
                [rowsPerPageOptions]="[10, 20, 40, 80]"
                [rows]="20"
                [totalRecords]="100"
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
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
    data : Pokemon [];
    query = new FormControl('');
    onPageChanged(paginatorState: PaginatorState) {
        console.log(paginatorState);
    }

    constructor(private backendService: BackendService) {
    }

    ngOnInit() {
        this.getDataTable()
    }

    getDataTable() {
        this.backendService.getPokemons(40, 0).subscribe((res: any) => {
            this.data = res.results;
            console.log(res)
        })
    }
}
