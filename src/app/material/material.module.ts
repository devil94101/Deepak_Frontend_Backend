import { NgModule } from '@angular/core';
import {MatFormFieldModule } from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatSliderModule} from '@angular/material/slider'
const Matmod=[
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSliderModule
]
@NgModule({
  declarations: [],
  imports:Matmod,
  exports:Matmod
})
export class MaterialModule { }
