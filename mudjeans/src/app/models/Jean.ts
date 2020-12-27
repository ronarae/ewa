export class Jean {
  productCode: string;
  styleName: string;
  fabric: string;
  washing: string;
  productCategory: string;
  latestStock: number;
  shouldOrder: boolean;


  // tslint:disable-next-line:max-line-length
  constructor(productCode: string, styleName: string, fabric: string, washing: string, productCategory: string, latestStock: number, shouldOrder: boolean) {
    this.productCode = productCode;
    this.styleName = styleName;
    this.fabric = fabric;
    this.washing = washing;
    this.productCategory = productCategory;
    this.latestStock = latestStock;
    this.shouldOrder = shouldOrder;
  }

  public static trueCopy(jean: Jean): Jean {
    // @ts-ignore
    return (jean == null ? null : Object.assign(new Jean(), jean));
  }



}
