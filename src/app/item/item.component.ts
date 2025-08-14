import { Component, OnInit } from '@angular/core';

type Item = {
  id: number;
  title: string;
  done: boolean;
};

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  items: Item[] = [];

  ngOnInit(): void {
    const existingItems = localStorage.getItem('items');

    // Caso JSON.parse() retorne null ou undefined, usa uma array vazia
    this.items = JSON.parse(existingItems as string) || [];
  }

  indexFromID(id: number): number {
    return this.items.findIndex((item) => item.id === id);
  }

  createItem(): void {
    const itemsIsEmpty = this.items.length === 0;
    const newID = itemsIsEmpty // Se a lista for vazia
      ? 0 // ...retorna 0 como índice,
      : Math.max(...this.items.map((item) => item.id)) + 1; // ...se não, pega o maior índice e soma 1.
    this.items.push({ id: newID, title: `Item ${newID + 1}`, done: false });

    localStorage.setItem('items', JSON.stringify(this.items));
  }

  deleteItem(id: number): void {
    const deletedItemIndex = this.indexFromID(id);
    this.items.splice(deletedItemIndex, 1);

    localStorage.setItem('items', JSON.stringify(this.items));
  }

  onSave(modifiedItems: Item[]): void {
    this.items = modifiedItems;

    localStorage.setItem('items', JSON.stringify(this.items));
  }
}
