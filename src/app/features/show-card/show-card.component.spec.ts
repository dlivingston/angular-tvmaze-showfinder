import { TestBed } from '@angular/core/testing';
import { Show } from '../../core/models/show.model';
import { ShowCardComponent } from './show-card.component';

describe('ShowCardComponent', () => {
  const baseShow: Show = {
    id: 1,
    title: 'The Bear',
    rating: 8.7,
    summary: 'A chef returns home to run his family sandwich shop.',
    imageUrl: 'https://example.com/the-bear.jpg'
  };

  it('renders image alt text from the show title', async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCardComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(ShowCardComponent);
    fixture.componentRef.setInput('show', baseShow);
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('.show-card__image') as HTMLImageElement;
    expect(image.getAttribute('alt')).toBe('The Bear');
  });

  it('hides rating when rating is null', async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCardComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(ShowCardComponent);
    fixture.componentRef.setInput('show', { ...baseShow, rating: null });
    fixture.detectChanges();

    const rating = fixture.nativeElement.querySelector('.show-card__rating');
    expect(rating).toBeNull();
  });

  it('shows fallback summary text when summary is empty', async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCardComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(ShowCardComponent);
    fixture.componentRef.setInput('show', { ...baseShow, summary: '' });
    fixture.detectChanges();

    const summary = fixture.nativeElement.querySelector('.show-card__summary') as HTMLElement;
    expect(summary.textContent?.trim()).toBe('No summary available.');
  });
});
