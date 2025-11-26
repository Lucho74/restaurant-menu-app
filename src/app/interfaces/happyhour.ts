export interface HappyHour {
    restaurantId: number,
    isActive: boolean,
    discountPercentage: number,
    startTime: string,
    endTime: string
};

export type NewHappyHour = Omit<HappyHour,
    "restaurantId"
>;