export interface Restaurant {
    id: number,
    email: string,
    password: string,
    name: string,
    imageUrl: string,
    description: string,
    number: string,
    address: string,
    openingTime: string,
    closingTime: string,
    openingDays: string
};

export type NewRestaurant = Omit<Restaurant, "id">;

export type RestaurantLogged = Omit<Restaurant, "password">;


