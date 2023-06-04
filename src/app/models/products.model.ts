export interface Product {
    id: string;
    name: string;
    img: string;
    availableAmount: number;
    minOrderAmount: number;
    price: number;
    orderedQuantity: number;
}