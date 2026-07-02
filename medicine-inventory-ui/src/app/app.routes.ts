import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'medicines',
      loadChildren: () =>
        import('./modules/medicine/medicine-module')
          .then(m => m.MedicineModule)
    },
    {
      path: 'sales',
      loadChildren: () =>
        import('./modules/sale/sale-module')
          .then(m => m.SaleModule)
    },
    {
      path: '',
      redirectTo: 'medicines',
      pathMatch: 'full'
    }
  ];