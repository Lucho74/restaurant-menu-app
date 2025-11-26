export interface CategoryWithProducts{
    id: number,
    name: string,
    description: string,
    restaurantId: number,
    productIds: number[]
};

export type Category = Omit<CategoryWithProducts, "productsIds">;

export type NewCategory = Omit<CategoryWithProducts,
    "id" |
    "productIds" |
    "restaurantId"
>;