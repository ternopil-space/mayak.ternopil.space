import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
	imports: [NgOptimizedImage, TranslatePipe],
	templateUrl: './socials.component.html',
	styleUrl: './socials.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialsComponent {}
