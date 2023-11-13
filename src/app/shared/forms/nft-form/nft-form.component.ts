import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { NftModel } from 'src/app/core/interface/model/nft-model';
import { NftModelValidator } from '../nft-model-validator';
import { Nft, PartialNft } from 'src/app/core/interface/model/nft';

@Component({
  selector: 'app-nft-form',
  templateUrl: './nft-form.component.html',
  styleUrls: ['./nft-form.component.css'],
})
export class NftFormComponent implements OnInit, OnDestroy {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  @Input() loading: boolean = false;

  constructor(private nftModelService: NftModelService) {}

  private nftModelsSubcription: Subscription | null = null;

  public nftModels: NftModel[] = [];
  public filteredOptions!: Observable<NftModel[]>;

  @Output() submitNft = new EventEmitter<PartialNft>();

  public nftForm = new FormGroup({
    token: new FormControl('', Validators.required),
    inSale: new FormControl(false, Validators.required),
    nftModel: new FormControl<NftModel | string>('', NftModelValidator),
  });

  get token() {
    return this.nftForm.get('token')!;
  }
  get inSale() {
    return this.nftForm.get('inSale')!;
  }
  get nftModel(): NftModel | null {
    const nftModel = this.nftForm.value.nftModel;
    return nftModel ? (typeof nftModel == 'object' ? nftModel : null) : null;
  }

  getModelImage() {
    const nftModel = this.nftForm.value.nftModel;
    return nftModel
      ? typeof nftModel == 'object'
        ? nftModel.nftImage!.path
        : null
      : null;
  }

  ngOnInit(): void {
    this.nftModelsSubcription = this.nftModelService
      .getModels({ pagination: false })
      .pipe(
        map((value) => {
          return value['hydra:member'];
        })
      )
      .subscribe((nftModels) => {
        this.nftModels = nftModels;
        this.filteredOptions = this.nftForm.get('nftModel')!.valueChanges.pipe(
          startWith(''),
          map((value) => {
            const name = typeof value === 'string' ? value : value?.name;
            return name ? this._filter(name as string) : this.nftModels.slice();
          })
        );
      });
  }

  ngOnDestroy(): void {
    this.nftModelsSubcription?.unsubscribe;
  }

  displayFn(nftModel: NftModel): string {
    console.log('displayFn');
    return nftModel && nftModel.name ? nftModel.name : '';
  }
  _filter(name: string): NftModel[] {
    console.log('filter');
    const filterValue = name.toLowerCase();
    return this.nftModels.filter((n) =>
      n.name.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    const Model = this.nftForm.value.nftModel as NftModel;
    console.log('Model ', Model['id']);

    const route = this.nftModelService.routeModel + Model.id;
    let nft: PartialNft = {
      token: this.nftForm.value.token!,
      nftModel: Model,
      inSale: this.nftForm.value.inSale!,
    };

    this.submitNft.emit(nft);
  }
}
