import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { HeaderLayout } from './layouts/header-layout/header-layout';
import { RestaurantMenuPage } from './pages/restaurant-menu-page/restaurant-menu-page';
import { RestaurantsListPage } from './pages/restaurants-list-page/restaurants-list-page';
import { onlyPublicGuard } from './guards/only-public-guard';

export const routes: Routes = [

    {
        path: "login",
        component: LoginPage,
        canActivate: [onlyPublicGuard]
    },
    {
        path: "register",
        component: RegisterPage,
    },
    {
        path: "",
        component: HeaderLayout,
        children: [
            {
                path: "",
                component: RestaurantMenuPage
            },
            {
                path: "restaurants",
                component: RestaurantsListPage
            }
        ]
    }


];
