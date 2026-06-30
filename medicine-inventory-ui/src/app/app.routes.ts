import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'medicines',
      loadChildren: () =>
        import('./modules/medicine/medicine-module')
          .then(m => m.MedicineModule)
    },
    {
      path: '',
      redirectTo: 'medicines',
      pathMatch: 'full'
    }
  ];