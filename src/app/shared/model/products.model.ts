export class Products {
    [x: string]: any;
    id!: BigInteger;
    productName!: string;
    service!: BigInteger;
    description!: string;
    productQuantity!: BigInteger;
    negativeBalance!: BigInteger;
    preco: any;
    productCode!: BigInteger;
    productDiscount!: BigInteger;
    minStock!: BigInteger;
    maxStock!: BigInteger;
    manufacturingExpenses!: BigInteger;
    productProfitPercent!: BigInteger;
    productProfitReais!: BigInteger;
    productCategory!: string;
    productBrand!: string;
    unitOfMeasurement!: string;
    status!: boolean;
    productReceiptDate!: Date;
    expirationDate!: Date;
    created!: Date;
    updated!: Date;
    barCode!: string;
    photos!: string;
    clients: any;
}