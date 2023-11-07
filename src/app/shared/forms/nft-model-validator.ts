import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { NftModel } from "src/app/core/interface/model/nft-model";


// Leverage TypeScript type guards to check to see if we have a Nft type selected
function instanceOfNftModel(nftModel: any): nftModel is NftModel {
    return !!nftModel // truthy
    && typeof nftModel !== 'string' // Not just string input in the autocomplete
    && 'name' in nftModel; // Has some qualifying property of NftModel type
}

export const NftModelValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
		!instanceOfNftModel(control?.value) ? { matchRequired: true } : null;

