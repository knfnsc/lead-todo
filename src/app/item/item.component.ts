import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  template: `
    <div>
      <label id="name"> {{ name }} </label>
      <input id="done" type="checkbox" value="{{ done }}" />
    </div>
  `,
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  name: string = ""
  done: boolean = false

  ngOnInit(): void {
  }

}
