import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalPages = 0;
  @Input() selectedPage = 0;
  @Output() pageSelected = new EventEmitter<number>();

  pages: number[] = [];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((e, i) => i + 1);
  }

  ngOnInit(): void {}

  selectPage(page: number) {
    this.pageSelected.emit(page);
  }
}
