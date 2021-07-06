export class Supplier {
    id!: BigInteger;
    supplierName!: string;
    supplierCnpj!: string;
    companySize!: string;
    legalNature!: string;
    status!: boolean;
    products: any;
    created!: Date;
    updated!: Date;
  }