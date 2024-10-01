import { ElementRef, Injectable, signal } from '@angular/core';
import { HTML } from 'angular-three';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  canvasRef = signal<HTMLCanvasElement>(document.createElement('canvas'));

  drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    position: 'horizontal' | 'vertical'
  ) {
    if (!ctx) throw new Error('Canvas context is not available');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(100, 100);

    ctx.fillStyle = 'red';
    ctx.font = '32px Arial';
    if (position === 'vertical') {
      ctx.rotate(Math.PI / 2);
    }
    if (ctx.measureText(text).width > 200) {
      ctx.font = '12px Arial';
    }
    ctx.fillText(text, 0, 0);
  }
}
