import { makeStateKey } from '@angular/core';
import { BootstrapData } from './bootstrap.interface';

export const BOOTSTRAP_STATE_KEY = makeStateKey<BootstrapData>('bootstrap-data');
