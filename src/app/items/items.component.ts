import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  form: FormGroup;
  itemsForms: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) {
    this.form = this.formBuilder.group({ items: this.formBuilder.array([]) });
    this.itemsForms = this.form.get('items') as FormArray;
  }

  ngOnInit(): void {
    this.itemService.getItems().forEach((item) => {
      this.itemsForms.push(this.formBuilder.group(item));
    });

    this.itemsForms.valueChanges
      .pipe(debounceTime(200), takeUntil(this.destroy$))
      .subscribe((changedItems) => this.itemService.updateItems(changedItems));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCreateClick(): void {
    this.itemsForms.push(
      this.formBuilder.group({
        id: this.itemService.nextID,
        title: '',
        done: false,
      })
    );
  }

  onDeleteClick(id: number): void {
    this.itemsForms.removeAt(id);
  }
}
