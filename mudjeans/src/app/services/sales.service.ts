import { Injectable } from '@angular/core';
import {Jean} from '../models/Jean';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  public jeans: Jean[];


  constructor() {
    this.jeans = [];
  }

  findAll(): Jean[] {
    return this.jeans;
  }

  findByProductcode(productcode: string): Jean {
    return this.jeans.find((jeans) => jeans.productCode === (productcode));
  }

  save(jean: Jean): Jean{
    const returnJean = this.findByProductcode(jean.productCode);
    this.jeans[this.jeans.findIndex((x) => x.productCode === jean.productCode)] = jean;
    return returnJean;
  }

  deleteByProductcode(id: string): Jean{
    const index = this.jeans.findIndex((jean) => jean.productCode === id);
    if (index === -1) {
      return null;
    }
    return this.jeans.splice(index, 1)[0];
  }
}
