export class Jean {
  mainType: string;
  productCode: string;
  description: string;
  size: string;


  constructor(productCode, description, size) {
    this.productCode = productCode;
    this.description = description;
    this.size = size;
  }

  public static trueCopy(jean: Jean): Jean {
    // @ts-ignore
    return (jean == null ? null : Object.assign(new Jean(), jean));
  }



}
