import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'input-cmp',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  value: string;
  @Input() type: string;
  @Output() onChange = new EventEmitter<string>();

  constructor() { }

  get inputType(): string {
    return this.type ? this.type : 'text';
  }

  handleChange(): void {
    if (this.onChange) {
      this.onChange.emit(this.value);
    }
  }
}
