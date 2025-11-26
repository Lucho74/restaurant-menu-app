import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { RestaurantMenuPage } from './pages/restaurant-menu-page/restaurant-menu-page';
import { RestaurantsListPage } from './pages/restaurants-list-page/restaurants-list-page';
import { onlyPublicGuard } from './guards/only-public-guard';
import { HomePage } from './pages/home-page/home-page';
import { ProductDetailsCard } from './components/product-details-card/product-details-card';
import { EditRestaurantPage } from './pages/edit-restaurant-page/edit-restaurant-page';
import { EditMenuPage } from './pages/edit-menu-page/edit-menu-page';
import { MyRestaurantPage } from './pages/my-restaurant-page/my-restaurant-page';
import { NewEditProductCard } from './components/new-edit-product-card/new-edit-product-card';
import { NewEditCategoryCard } from './components/new-edit-category-card/new-edit-category-card';
import { AddProductToCategoryCard } from './components/add-product-to-category-card/add-product-to-category-card';
import { DeleteProductToCategoryCard } from './components/delete-product-to-category-card/delete-product-to-category-card';
import { HappyHourCard } from './components/happy-hour-card/happy-hour-card';
import { AddDiscountToProductCard } from './components/add-discount-to-product-card/add-discount-to-product-card';
import { onlyRestaurantGuard } from './guards/only-restaurant-guard';

export const routes: Routes = [

    {
        path: "login",
        component: LoginPage,
        canActivate: [onlyPublicGuard]
    },
    {
        path: "register",
        component: RegisterPage,
        canActivate: [onlyPublicGuard]
    },

    {
        path: "",
        component: HomePage
    },
    {
        path: "restaurants",
        component: RestaurantsListPage,
    },
    {
        path: "restaurants/:id",
        component: RestaurantMenuPage,
        children: [
            {
                path: "products/:productId",
                component: ProductDetailsCard
            }
        ]
    },
    {
        path: "my-restaurant/:id",
        component: MyRestaurantPage,
        canActivate: [onlyRestaurantGuard]
    },
    {
        path: "my-restaurant/:id/info",
        component: EditRestaurantPage,
        canActivate: [onlyRestaurantGuard]

    },
    {
        path: "my-restaurant/:id/menu",
        component: EditMenuPage,
        canActivate: [onlyRestaurantGuard],
        children: [
            {
                path: "add-product",
                component: NewEditProductCard
            },
            {
                path: "edit-product/:productId",
                component: NewEditProductCard,
                children: [
                    {
                        path: "add-discount",
                        component: AddDiscountToProductCard
                    }
                ]
            },
            {
                path: "add-category",
                component: NewEditCategoryCard
            },
            {
                path: "edit-category/:categoryId",
                component: NewEditCategoryCard
            },
            {
                path: "add-product-to-category/:categoryId",
                    component: AddProductToCategoryCard
            },
            {
                path: "delete-product-to-category/:categoryId",
                component: DeleteProductToCategoryCard
            },
            {
                path: "happy-hour-config",
                component: HappyHourCard
            }
            
        ]
    },


];

