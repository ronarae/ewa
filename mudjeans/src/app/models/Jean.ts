export class Jean {
  // productCode: string;
  // description: string;
  // size: string;
  //
  // constructor(productCode, description, size) {
  //   this.productCode = productCode;
  //   this.description = description;
  //   this.size = size;
  // }

  constructor(public productCode: string, public description: string, public size: string) {
  }

  public static trueCopy(jean: Jean): Jean {
    return (jean == null ? null : Object.assign(new Jean(), jean));
  }

}
