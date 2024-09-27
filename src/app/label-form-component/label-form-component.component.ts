import { Component, ElementRef, model, OnInit, viewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'label-form-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './label-form-component.component.html',
  styleUrl: './label-form-component.component.scss',
})
export class LabelFormComponentComponent implements OnInit {
  readonly text = model.required<string>();
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  form = new FormControl<string>('');

  ngOnInit(): void {
    this.canvas().nativeElement.width = 200;
    this.canvas().nativeElement.height = 200;
    this.canvas().nativeElement.style.border = '1px solid black';

    const ctx = this.canvas().nativeElement.getContext('2d');
    if (!ctx) throw new Error('Canvas context is not available');

    this.form.valueChanges.subscribe((value) => {
      if (value === null) {
        return;
      }
      this.text.set(value);
      this.drawText(ctx, value, 'horizontal');
    });
  }

  drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    position: 'horizontal' | 'vertical'
  ) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(
      0,
      0,
      this.canvas().nativeElement.width,
      this.canvas().nativeElement.height
    );
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
