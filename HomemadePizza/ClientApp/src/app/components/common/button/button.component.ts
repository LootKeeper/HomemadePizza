import { Component, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: 'button-component',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string;
  @Input() isSubmittable = true;
  @Output() onClick = new EventEmitter();

  handleClick(): void {
    if (this.onClick) {
      this.onClick.emit();
    }
  }
}
