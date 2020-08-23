import { Component, Input } from "@angular/core";

@Component({
  selector: 'label-component',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent {
  @Input() value: string;
}
