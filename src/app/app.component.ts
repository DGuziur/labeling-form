import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LabelThreemodelComponent } from './label-threemodel/label-threemodel.component';
import { NgtCanvas } from 'angular-three';
import { LabelFormComponentComponent } from './label-form-component/label-form-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LabelThreemodelComponent,
    NgtCanvas,
    LabelFormComponentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'labeling-form';
  readonly text = '';
  readonly model = LabelThreemodelComponent;
}
