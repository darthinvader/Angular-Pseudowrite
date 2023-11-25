import { moduleMetadata } from '@storybook/angular';
import { MockAngularFirestore, MockAuthService, mockActivatedRoute } from './firebaseSetup'; // Adjust path as necessary
import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { AuthService } from '../src/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: AngularFirestore, useClass: MockAngularFirestore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }),
  ],
};

export default preview;
