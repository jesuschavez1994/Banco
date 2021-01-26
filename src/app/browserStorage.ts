/* 
	Usamos éste archivo para implementar el localStorage sin usar Vanilla JavaScript directamente.
*/
import { InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});
