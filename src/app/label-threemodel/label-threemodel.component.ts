import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { extend } from 'angular-three';
import { NgtCanvas, NgtArgs } from 'angular-three';
import { NGT_STORE } from 'angular-three';
import { OrbitControls } from 'three-stdlib';
import * as THREE from 'three';

extend(THREE);
extend({ OrbitControls });

@Component({
  selector: 'label-model',
  standalone: true,
  imports: [NgtCanvas, NgtArgs],
  templateUrl: './label-threemodel.component.html',
  styleUrl: './label-threemodel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LabelThreemodelComponent {
  private readonly store = inject(NGT_STORE);
  readonly camera = this.store.get('camera');
  readonly glDom = this.store.get('gl', 'domElement');

  config = {
    rowElementsCount: 3,
    rowCount: 3,
    rowHeight: 3,
    columnCount: 6,
    columnWidth: 1,
    margin: 0.1,
  };

  readonly pi = Math.PI;

  ok(array: number[], index: number) {
    const height = this.config.rowHeight * this.config.rowCount;
    const bottomLine = -((this.config.rowHeight * this.config.rowCount) / 2);
    const rowGap = height / (array.length + 1);
    if (rowGap < 1) {
      return alert('rowGap is too smoll');
    }
    return bottomLine + rowGap + rowGap * index;
  }
}
