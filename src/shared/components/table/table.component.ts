import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";

export interface TableColumn {
  header: string;
  field: string;
  type?: 'text' | 'number' | 'date' | 'button' | 'custom';
  width?: string;
  // For button type
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary';
  buttonAction?: (row: any) => void;
  // For custom type
  customTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() actions: boolean = false;
  @ContentChild('actionTemplate') actionTemplate?: TemplateRef<any>;
  @Output() rowClick = new EventEmitter<any>();

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }
}
