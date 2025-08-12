import { Component, OnInit } from '@angular/core';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items_unparsed = sessionStorage.getItem("items")
  items = []

  constructor() { }

  ngOnInit(): void {
    if (this.items_unparsed === null) {
      let a = [{title: "coisa", done: false}]
      this.items_unparsed = JSON.stringify(a)
      sessionStorage.setItem("items", this.items_unparsed)
    }

    this.items = JSON.parse(this.items_unparsed)
  }

}
