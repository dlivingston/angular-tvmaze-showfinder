import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Show } from '../../core/models/show.model';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './show-card.component.html',
  styleUrl: './show-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowCardComponent {
  @Input({ required: true }) show!: Show;
}
