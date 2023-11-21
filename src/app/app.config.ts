// Import necessary Angular and Firebase modules
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';

// Import routes and environment configuration
import { routes } from './app.routes';
import { environment } from '../environments/environment'; // Adjust this path as necessary based on your project structure
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
// Define the application configuration using Angular's dependency injection
export const appConfig: ApplicationConfig = {
  providers: [
    // Provide router for application routes
    provideRouter(routes),

    // Provide client hydration for Angular Universal (Server-Side Rendering)
    provideClientHydration(),

    // Import Firebase application initialized with environment-specific configuration
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseConfig))),

    // Import providers for various Firebase services
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideFunctions(() => getFunctions())),
    importProvidersFrom(provideStorage(() => getStorage())),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }

    // ... include other providers as needed for your application
  ]
};

// Note: Ensure the paths in the imports (like './app.routes' and '../environments/environment')
// are correctly adjusted to match the structure of your Angular project.
