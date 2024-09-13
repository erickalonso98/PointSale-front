import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ClientsComponent } from './components/clients/clients.component';
import { UsersComponent } from './components/users/users.component';
import { ProviderComponent } from './components/provider/provider.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductsComponent } from './components/products/products.component';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { SaleComponent } from './components/sale/sale.component';

export const routes: Routes = [
    { path:'login',component:LoginComponent },
    { path:'',pathMatch:'full',redirectTo:'/login' },
    { path:'Dashboar-Admin',component:DashboardAdminComponent },
    { path:'users',component:UsersComponent },
    { path:'roles',component:RolesComponent },
    { path:'permissions',component:PermissionsComponent },
    { path:'clients',component:ClientsComponent },
    { path:'providers',component:ProviderComponent },
    { path:'categories',component:CategoryComponent },
    { path:'products',component:ProductsComponent },
    { path:'company',component:CompaniesComponent },
    { path:'sales',component:SaleComponent }
];
