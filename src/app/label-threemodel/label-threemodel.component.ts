import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  model,
} from '@angular/core';
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
  readonly text = model.required<string>();
  private readonly store = inject(NGT_STORE);
  readonly camera = this.store.get('camera');
  readonly glDom = this.store.get('gl', 'domElement');

  config = {
    rowElementsCount: 7,
    rowCount: 3,
    rowHeight: 3,
    columnCount: 6,
    columnWidth: 1,
    margin: 0.1,
    marginRow: 1,
    displayedText: 'SDA@AD',
  };

  readonly rowArray = new Array(this.config.rowElementsCount).fill(0);
  readonly columnArray = new Array(this.config.rowElementsCount).fill(0);
  readonly pi = Math.PI;

  ok(array: number[], index: number, opt = 0) {
    const height = this.config.rowHeight * this.config.rowCount;
    const bottomLine = -((this.config.rowHeight * this.config.rowCount) / 2);
    const rowGap = height / (array.length + 1);
    if (rowGap < this.config.marginRow) {
      throw alert('rowGap is too smoll');
    }
    return bottomLine + rowGap + rowGap * index + opt;
  }

  calculateColumnItemInterval(array: number[], index: number) {
    const width = this.config.columnWidth * this.config.columnCount;
    const leftLine = -((this.config.columnWidth * this.config.columnCount) / 2);
    const columnGap = width / (array.length + 1);
    if (columnGap < this.config.margin) {
      return alert('columnGap is too smoll');
    }
    return leftLine + columnGap + columnGap * index;
  }

  generateTextTexture(
    text: string,
    isVertical: boolean = false
  ): THREE.Texture {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 256;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (isVertical) {
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(-Math.PI / 2);
      context.translate(-canvas.height / 2, -canvas.width / 2);
    }

    context.font = '48px Arial';
    context.fillStyle = 'black';
    context.fillText(text, 0, canvas.height / 2);

    return new THREE.CanvasTexture(canvas);
  }
}
