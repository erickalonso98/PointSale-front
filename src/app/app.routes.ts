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
import { RegisterFormUserComponent } from './components/register-form-user/register-form-user.component';
import { UserFormUpdateComponent } from './components/user-form-update/user-form-update.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { CreateRoleComponent } from './components/create-role/create-role.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RoleFormUpdateComponent } from './components/role-form-update/role-form-update.component';
import { FormPermissionComponent } from './components/form-permission/form-permission.component';
import { PermissionDetailComponent } from './components/permission-detail/permission-detail.component';
import { PermissionUpdateFormComponent } from './components/permission-update-form/permission-update-form.component';


import { identityGuard } from './identity.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientUpdateComponent } from './components/client-update/client-update.component';

export const routes: Routes = [
    { path:'login',component:LoginComponent },
    { path:'',pathMatch:'full',redirectTo:'/login' },
    { path:'Dashboar-Admin',component:DashboardAdminComponent,canActivate:[identityGuard] },
    { path:'users',component:UsersComponent,canActivate:[identityGuard] },
    { path:'roles',component:RolesComponent,canActivate:[identityGuard] },
    { path:'permissions',component:PermissionsComponent,canActivate:[identityGuard] },
    { path:'clients',component:ClientsComponent,canActivate:[identityGuard] },
    { path:'providers',component:ProviderComponent,canActivate:[identityGuard] },
    { path:'categories',component:CategoryComponent,canActivate:[identityGuard] },
    { path:'products',component:ProductsComponent,canActivate:[identityGuard] },
    { path:'company',component:CompaniesComponent,canActivate:[identityGuard] },
    { path:'sales',component:SaleComponent,canActivate:[identityGuard] },
    { path:'register-user',component:RegisterFormUserComponent,canActivate:[identityGuard] },
    { path:'update-user/:id',component:UserFormUpdateComponent,canActivate:[identityGuard] },
    { path:'user-detail/:id',component:UserDetailComponent,canActivate:[identityGuard] },
    { path:'create-role',component:CreateRoleComponent,canActivate:[identityGuard] },
    { path:'role-detail/:id',component:RoleDetailComponent,canActivate:[identityGuard] },
    { path:'role-form-update/:id',component:RoleFormUpdateComponent,canActivate:[identityGuard] },
    { path:'create-permission',component:FormPermissionComponent,canActivate:[identityGuard] },
    { path:'permission-detail/:id',component:PermissionDetailComponent,canActivate:[identityGuard] },
    { path:'update-permission-form/:id',component:PermissionUpdateFormComponent,canActivate:[identityGuard] },
    { path:'create-client',component:CreateClientComponent },
    { path:'client-detail/:id',component:ClientDetailComponent },
    { path:'client-update-form/:id',component:ClientUpdateComponent },
    { path:'**',component:NotFoundComponent }
];
