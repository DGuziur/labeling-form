import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LabelThreemodelComponent } from './label-threemodel/label-threemodel.component';
import { NgtCanvas } from 'angular-three';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LabelThreemodelComponent, NgtCanvas],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'labeling-form';
  readonly model = LabelThreemodelComponent;
}
