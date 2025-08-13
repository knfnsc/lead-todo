import { Component, OnInit } from '@angular/core';
import { title } from 'process';

type Item = {
  id: number,
  title: string,
  done: boolean
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  title: string = "Coisa"
  done: boolean = false

  items: Item[] = []

  ngOnInit(): void {
    const existingItems = sessionStorage.getItem("items")
    this.items = JSON.parse(existingItems as string) || []
  }

  retrieveIndexFromId(id: number): number {
    return this.items.findIndex(item => item.id === id)
  }

  createItem(): void {
    const new_id = this.items.length === 0 ? 0 : Math.max(...this.items.map(item => item.id)) + 1
    this.items.push({id: new_id, title: "Coisa", done: false})

    sessionStorage.setItem("items", JSON.stringify(this.items))
  }

  deleteItem(id: number): void {
    const deleted_item_id = this.retrieveIndexFromId(id)
    this.items.splice(deleted_item_id, 1)

    sessionStorage.setItem("items", JSON.stringify(this.items))
  }

  onSave(id: number, new_title: string, done: boolean): void {
    const modified_item_id = this.retrieveIndexFromId(id)
    this.items[modified_item_id] = {id: modified_item_id, title: new_title, done: done}

    sessionStorage.setItem("items", JSON.stringify(this.items))
  }
}
