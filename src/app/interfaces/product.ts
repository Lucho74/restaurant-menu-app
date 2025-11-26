export interface ProductWithCategories {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
    isFeatured:	boolean,
    hasDiscount: boolean,
    discountPercentage: number,
    discountPrice: number,
    discountStart: string,
    discountEnd: string,
    hasHappyHour: boolean,
    happyHourPrice: number,
    restaurantId: number,
    categoryIds: number[]
};

export type Product = Omit<ProductWithCategories, "categoriesIds">;

export type NewProduct = Omit<ProductWithCategories, 
    "id"|
    "hasDiscount" |
    "discountPercentage" |
    "discountPrice" |
    "discountStart" |
    "discountEnd" |
    "happyHourPrice" |
    "restaurantId" |
    "categoryIds"
    >

export type Discount = Omit<ProductWithCategories,
    "id"|
    "name"|
    "price"|
    "description"|
    "imageUrl"|
    "isFeatured"|
    "discountPrice"|
    "hasHappyHour"|
    "happyHourPrice"|
    "restaurantId"|
    "categoryIds"
>
