import { Component, Input, OnInit } from '@angular/core';
import { NftCollection } from 'src/app/core/interface/model/nft-collection';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css'],
})
export class CollectionCardComponent implements OnInit {
  @Input() nftColection!: NftCollection;
  @Input() active!: boolean;

  ngOnInit(): void {
    console.log(this.nftColection);
  }

  public get image() {
    return this.nftColection.path
      ? this.nftColection.path
      : 'https://ucarecdn.com/75d7700d-c102-40ff-9ba1-f0641444c616/dota2.jpg';
    // return 'https://ucarecdn.com/75d7700d-c102-40ff-9ba1-f0641444c616/dota2.jpg';
  }

  get name() {
    return this.nftColection.name;
  }

  get description() {
    return this.nftColection.description;
  }
}
