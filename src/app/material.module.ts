import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatSortModule,
  MatRadioModule,
  MatTableModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule
} from "@angular/material";
const material = [
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatSortModule,
  MatRadioModule,
  MatTableModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule
];

@NgModule({
  imports: [CommonModule, ...material],
  exports: [...material],
  entryComponents: [],
  declarations: []
})
export class MaterialModule {}
