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
import { CanvasService } from '../services/canvas.service';

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
  readonly canvasService = inject(CanvasService);
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
  texture: THREE.Texture = this.generateTextTexture();

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
    position: 'vertical' | 'horizontal' = 'horizontal'
  ): THREE.Texture {
    const canvas = document.createElement('canvas');
    if (!canvas) throw new Error('Canvas is not available');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context is not available');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

    ctx.fillStyle = 'red';
    ctx.font = '32px Arial';
    if (position === 'vertical') {
      ctx.rotate(Math.PI / 2);
    }
    if (ctx.measureText(this.config.displayedText).width > ctx.canvas.width) {
      ctx.font = '12px Arial';
    }
    ctx.fillText(this.config.displayedText, 0, 0);
    const threeCanvas = new THREE.CanvasTexture(canvas);
    if (this.texture) {
      this.texture.dispose();
      this.texture = threeCanvas;
    }
    threeCanvas.needsUpdate = true;
    return threeCanvas;
  }
}
