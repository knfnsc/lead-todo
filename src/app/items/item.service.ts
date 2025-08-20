import { Injectable } from '@angular/core';

interface Item {
  id: number;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  getItems(): Item[] {
    return JSON.parse(localStorage.getItem('items') as string) || [];
  }

  updateItems(items: Item[]): void {
    const itemsWithUpdatedID = items.map((item, index) => ({
      ...item,
      id: index,
    }));
    localStorage.setItem('items', JSON.stringify(itemsWithUpdatedID));
  }
}
