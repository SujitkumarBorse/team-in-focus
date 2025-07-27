import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { GallaryComponent } from './gallary/gallary.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';

export const routes: Routes = [
    { 
        path: 'home', 
        component: HomeComponent, 
        title: 'Home'
    },
    { 
        path: 'contact', 
        component: ContactComponent, 
        title: 'Contact'
    },
    { 
        path: 'gallery', 
        component: GallaryComponent, 
        title: 'Gallery'
    },
    { 
        path: 'team', 
        component: TeamComponent, 
        title: 'Team'
    },
    { 
        path: 'services', 
        component: ServicesComponent, 
        title: 'Services'
    },
    { 
        path: 'about', 
        component: AboutComponent, 
        title: 'About'
    },
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        redirectTo: '/home' 
    }
];
