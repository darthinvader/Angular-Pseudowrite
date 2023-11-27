// skeleton.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div class="skeleton">
      <div class="skeleton-line short"></div>
      <div class="skeleton-line long"></div>
      <div class="skeleton-line medium"></div>
      <div class="skeleton-line short"></div>
    </div>
  `,
  styles: [`
          .skeleton {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            border-radius: 4px;
            background-color: var(--color-div);
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
          }

        .skeleton-line {
          height: 20px;
          background-color: var(--color-button);
          border-radius: 4px;
        }

        .skeleton-line.short {
          width: 10%;
        }

        .skeleton-line.long {
          width: 60%;
        }

        .skeleton-line.medium {
          width: 20%;
        }

        @keyframes pulse {
          0%, 100% { background-color: var(--color-button); }
          50% { background-color: var(--color-button-hover); }
        }

        .skeleton-line {
          animation: pulse 1.5s infinite ease-in-out;
        }
  `]
})
export class SkeletonComponent { }
