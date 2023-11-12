import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, forkJoin, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { EthValueData } from 'src/app/core/interface/data/eth-value-data';
import { DataSerie, GraphData } from 'src/app/core/interface/graph-data';
import { ModelData } from 'src/app/core/interface/data/model-data';
import { Nft } from 'src/app/core/interface/model/nft';
import { NftModel } from 'src/app/core/interface/model/nft-model';
import { NftValue } from 'src/app/core/interface/model/nft-value';
import { ParamNftValue } from 'src/app/core/interface/param/param-nft-value';
import { ParamPagination } from 'src/app/core/interface/param/param-pagination';
import { User } from 'src/app/core/interface/model/user';
import { EthService } from 'src/app/core/services/eth.service';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { NftValueService } from 'src/app/core/services/nft-value.service';
import { NftService } from 'src/app/core/services/nft.service';
import { NftImage } from 'src/app/core/interface/model/nft-image';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  constructor(
    private EthService: EthService,
    private auth: AuthService,
    private nftService: NftService,
    private nftModelService: NftModelService,
    private nftValuesService: NftValueService
  ) {}

  subscriptionNftData: Subscription | undefined;
  loadingComplete: boolean = false;
  ethValue: any | null = null;
  ethValues: any[] = [];
  previousEthValue: any;
  currentEthValue: any;
  user: User | null = null;

  purchasedTotalValue: number | null = null;

  nftValues: any[] = [];

  nfts: Nft[] = [];

  nftsPerf: any[] = [];
  graphData: GraphData = [];

 
  ngOnInit(): void {
    // this.getGalery();

    // obtention des information relatives a la galere
    this.auth.getGalery().subscribe(
      (
        res: {
          nft: Nft;
          previous: number;
          current: number;
          nftModel: NftModel;
          nftImage: NftImage;
        }[]
      ) => {
        
        this.nftValues = res.map((entry) => {
          let nftModel = entry.nftModel;
          nftModel.nftImage = entry.nftImage;
          entry.nft.nftModel = nftModel;

          return {
            current: entry.current,
            previous: entry.previous,
            nft: entry.nft,
          };
        });
       
        this.loadingComplete = true;
      }
    );


    const ObservableEth = this.EthService.getEthValues(7)
      .pipe(
        map((res) => {
          let series: DataSerie = {
            name: 'ETH',
            series: [],
          };

          let array: any[] = [];

          res.forEach((re) => {
            const date = new Date(re.time * 1000);
            array.push(re.close);
            series.series.push({
              value: re.close,
              name: date,
            });
          });
          this.ethValues = array;
          this.graphData = [series];

          const last = res.length - 1;
          this.previousEthValue = res[last - 1].close;
          this.currentEthValue = res[last].close;
        })
      )
      .subscribe();

    this.EthService.getEthValue().subscribe((res: EthValueData) => {
      this.ethValue = res.data.rates.EUR;
    });
  }

  ngOnDestroy() {
    this.subscriptionNftData?.unsubscribe();
  }

  getNftImage(nft: Nft) {
    const model = nft.nftModel as NftModel;
    return model.nftImage!.path;
  }

  getModel(nft: Nft) {
    const model = nft.nftModel as NftModel;
    return model;
  }

  getTotalPurchasedValue() {
    const result = this.nftValues.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.nft.buyingPrice;
    }, 0);
    return Math.round(result * 100) / 100;
  }

  getGaleryCurrentValue() {
    let current = this.nftValues.reduce((accumulator, Nftvalue) => {
      const result = accumulator + Nftvalue.current.value;
      return Math.round(result * 100) / 100;
    }, 0);

    return current;
  }

  getPerformanceGalery(){
    const fraction= this.getGaleryCurrentValue()/this.getTotalPurchasedValue()

    return (fraction - 1) * 100
  }
  getGaleryCurrentValueEUR() {
    let current = this.nftValues.reduce((accumulator, Nftvalue) => {
      const result = accumulator + Nftvalue.current.value;
      return Math.round(result * 100) / 100;
    }, 0);

    const total = current * this.ethValue;

    return Math.round(total * 100) / 100;
  }
  getGaleryPreviousValue() {
    return this.nftValues.reduce((accumulator, Nftvalue) => {
      const result = accumulator + Nftvalue.previous.value;
      return Math.round(result * 100) / 100;
    }, 0);
  }
  getGaleryPreviousValueEUR() {
    const total = this.nftValues.reduce((accumulator, Nftvalue) => {
      const sum = accumulator + Nftvalue.previous.value;
      return sum;
    }, 0);

    const result = total * this.previousEthValue;
    return Math.round(result * 100) / 100;
  }

  getPerformanceGaleryEth() {
    const fraction =
      this.getGaleryCurrentValue() / this.getGaleryPreviousValue();

    // return Number.prototype.toFixed(fraction)

    return (fraction - 1) * 100;
  }
  getPerformanceGaleryEUR() {
    const last = this.ethValues.length - 1;
    const currentvalueEUR = this.getGaleryCurrentValue() * this.currentEthValue;

    const previousvalueEUR = this.getGaleryPreviousValueEUR();

    const fraction = currentvalueEUR / previousvalueEUR;

    // return Number.prototype.toFixed(fraction)
    return (fraction - 1) * 100;
  }
  getPerformanceETH() {
    const last = this.ethValues.length - 1;

    const fraction = this.ethValues[last] / this.ethValues[last - 1];
    return (fraction - 1) * 100;
  }

  getPerformanceNft(nftValues: {
    nft: Nft;
    current: { value: number; valueDate: Date };
    previous: { value: number; valueDate: Date };
  }) {
    const fraction = nftValues.current.value / nftValues.previous.value;

    return Math.round((fraction - 1) * 100);
  }

  getGalery() {
    let observableNftData = this.auth
      .getCurrentUser()
      ?.pipe(
        switchMap((user) => {
          this.user = user;

          return this.nftService
            .getAllNft({
              'user.id': user.id,
              'order[purchaseDate]': 'DESC',
            })
            .pipe(
              map((nftData) => {
                return this.nftService.extractNfts(nftData);
              })
            );
        })
      )
      .pipe(
        switchMap((nfts: Nft[]) => {
          this.purchasedTotalValue = nfts.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue.buyingPrice;
            },
            0
          );

          const observable = nfts.map((nft) => {
            const route = nft.nftModel as string;
            return this.nftModelService.getNftModelById(route);
          });

          return forkJoin(observable).pipe(
            map((nftmodels) => {
              nftmodels.forEach((nftmodel, index) => {
                nfts[index].nftModel = nftmodel;
              });

              return nfts;
            })
          );
        })
      )
      .pipe(
        switchMap((nfts: Nft[]) => {
          this.nfts = nfts;

          const Observable = nfts.map((nft) => {
            const nftModel = nft.nftModel as NftModel;
            const ParamNftValue: ParamNftValue & ParamPagination = {
              itemsPerPage: 2,
              'nftModel.id': nftModel.id,
              'order[valueDate]': 'DESC',
            };
            return this.nftValuesService.getNftValues(ParamNftValue).pipe(
              map((valueData) => {
                return this.nftValuesService.extractNftValues(valueData);
              })
            );
          });

          return forkJoin(Observable);
        })
      );

    this.subscriptionNftData = observableNftData?.subscribe((NftValues) => {
      this.nftValues = NftValues.map((nftValue, index) => {
        return {
          nft: this.nfts[index],
          current: nftValue[0],
          previous: nftValue[1],
        };
      });
      this.loadingComplete = true;
    });
  }

}


 // ngOnInit(): void {
  //   // On recupere l'utilisateur
  //   let observableNftData = this.auth
  //     .getCurrentUser()
  //     ?.pipe(
  //       switchMap((user) => {
  //         this.user = user;

  //         let nftRoutes: string[] = this.user.nfts as string[];

  //         const Observable = nftRoutes.map((route) => {
  //           return this.nftService.getNfById(route).pipe(
  //             switchMap((nft: Nft) => {
  //               let route = nft.nftModel as string;
  //               return this.nftModelService.getNftModelById(route).pipe(
  //                 map((nftModel) => {
  //                   nft.nftModel = nftModel;
  //                   return nft;
  //                 })
  //               );
  //             })
  //           );
  //         });

  //         return forkJoin(Observable);
  //       })
  //     )
  //     .pipe(
  //       switchMap((nfts) => {
  //         const Observable = nfts.map((nft) => {
  //           const nftModel = nft.nftModel as NftModel;
  //           const ParamNftValue: ParamNftValue & ParamPagination = {
  //             itemsPerPage: 2,
  //             'nftModel.id': nftModel.id,
  //             'order[valueDate]': 'DESC',
  //           };

  //           // let routes = nftModel.nftValues.slice(-2);

  //           // let observablValue = routes.map((route) => {
  //           //   return this.nftValuesService.getNftValue(route as string);
  //           // });

  //           // return forkJoin(observablValue).pipe(map(nftValues=>{
  //           //   return {
  //           //     nft: nft,
  //           //     current: nftValues[1],
  //           //     previous: nftValues[0],
  //           //   };
  //           // }))

  //           return this.nftValuesService.getNftValues(ParamNftValue).pipe(
  //             map((valueData) => {
  //               const nftValue =
  //                 this.nftValuesService.extractNftValues(valueData);
  //               return {
  //                 nft: nft,
  //                 current: nftValue[0],
  //                 previous: nftValue[1],
  //               };
  //             })
  //           );
  //         });
  //         return forkJoin(Observable);
  //       })
  //     );
  //   this.subscriptionNftData = observableNftData?.subscribe((nftsValues) => {
  //     this.nftValues = nftsValues;
  //     this.loadingComplete = true;
  //   });

  //   const ObservableEth = this.EthService.getEthValues(7)
  //     .pipe(
  //       map((res) => {
  //         let series: DataSerie = {
  //           name: 'ETH',
  //           series: [],
  //         };

  //         let array: any[] = [];

  //         res.forEach((re) => {
  //           const date = new Date(re.time * 1000);
  //           array.push(re.close);
  //           series.series.push({
  //             value: re.close,
  //             name: date,
  //           });
  //         });
  //         this.ethValues = array;
  //         this.graphData = [series];

  //         const last = res.length - 1;
  //         this.previousEthValue = res[last - 1].close;
  //         this.currentEthValue = res[last].close;
  //       })
  //     )
  //     .subscribe();

  //   this.EthService.getEthValue().subscribe((res: EthValueData) => {
  //     this.ethValue = res.data.rates.EUR;
  //     console.log('ethValue ', this.ethValue);
  //   });
  // }