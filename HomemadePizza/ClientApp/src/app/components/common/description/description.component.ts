import { Component, Input } from "@angular/core";

@Component({
  selector: 'description-component',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  @Input() value: string;
}
