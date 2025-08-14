import { Component, OnInit } from '@angular/core';

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
  items: Item[] = []
  
  title: string = "Coisa"
  done: boolean = false

  ngOnInit(): void {
    const existingItems= localStorage.getItem("items")
    
    // Caso JSON.parse() retorne null ou undefined, usa uma array vazia
    this.items = JSON.parse(existingItems as string) || []
  }

  indexFromID(id: number): number {
    return this.items.findIndex(item => item.id === id)
  }

  createItem(): void {
    const newID = this.items.length === 0                    // Se a lista for vazia
      ? 0                                                     // ...retorna 0 como índice,
      : Math.max(...this.items.map(item => item.id)) + 1      // ...se não, pega o maior índice e soma 1.
    this.items.push({id: newID, title: "Coisa", done: false})

    localStorage.setItem("items", JSON.stringify(this.items))
  }

  deleteItem(id: number): void {
    const deletedItemIndex = this.indexFromID(id)
    this.items.splice(deletedItemIndex, 1)

    localStorage.setItem("items", JSON.stringify(this.items))
  }

  onSave(modifiedItem: Item): void {
    const modifiedItemIndex = this.indexFromID(modifiedItem.id)
    this.items[modifiedItemIndex] = {
      id: modifiedItem.id,
      title: modifiedItem.title,
      done: modifiedItem.done
    }

    localStorage.setItem("items", JSON.stringify(this.items))
  }
}
