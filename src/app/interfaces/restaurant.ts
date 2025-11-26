export interface Restaurant {
    id: number,
    email: string,
    password: string,
    name: string,
    description: string,
    imageUrl: string,
    number: string,
    address: string,
    views: number,
    openingTime: string,
    closingTime: string,
    openingDays: string
};

export type NewRestaurant = Omit<Restaurant, "id">;

export type RestaurantPublic = Omit<Restaurant, "password">;

export type EditedRestaurant = Omit<Restaurant, "id" | "password" | "email" | "views">;








