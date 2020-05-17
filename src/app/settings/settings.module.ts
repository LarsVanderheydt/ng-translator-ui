import { settingsRoutingModule } from './settings.routing.module';
import { SettingsComponent } from './settings.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    settingsRoutingModule,
    ReactiveFormsModule
  ]
})
export class settingsModule {}
