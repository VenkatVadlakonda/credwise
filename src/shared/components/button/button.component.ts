import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  // @Input() onClick: (event: MouseEvent) => void = () => {};
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Input() ngStyle: { [key: string]: any } = {};
  @Input() ngClass!: string | string[] | Set<string> | { [klass: string]: any; };


  get buttonClass(): string {
    return this.variant;
  }

}
