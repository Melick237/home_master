import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomComponent } from 'src/app/components/forms/add-room/add-room.component';
import { TaskFormComponent } from 'src/app/components/forms/task-form/task-form.component';
import { TasksComponent } from '../dashboard/tasks/tasks.component';
import { HomeNewComponent } from '../home-new/home-new.component';
import { SettingsComponent } from '../settings/settings.component';
import { StatementComponent } from '../statement/statement.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'welcome1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'welcome2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'welcome3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'home-new',
        component: HomeNewComponent
      },
      {
        path: 'add-room',
        component: AddRoomComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'statement',
        component: StatementComponent
      },
      {
        path: 'home',
        component: TasksComponent
      },
      {
        path: 'add-task',
        component: TaskFormComponent
      },
      {
        path: '',
        redirectTo: '/tabs/welcome1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
