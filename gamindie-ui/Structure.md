
src/
|-- app/
    |-- core/                   # For fixed/shared components (e.g., top bar, left menu)
        |-- components/         # Reusable components (top bar, sidebar)
        |-- services/           # Shared services
    |-- modules/                # Lazily loaded feature modules
        |-- center/             # For center section modules
            |-- posts/          # Center module 1
            |-- profile/        # Center module 2
        |-- right/              # For right section modules
            |-- messenger/      # Right module 1
            |-- friend-requests/ # Right module 2
        |-- auth/               # Auth-related modules
            |-- login/          # Login module
            |-- register/       # Register module
            |-- forgot-password/ # Forgot Password module
    |-- shared/                 # Shared utilities, guards, interceptors
    |-- app-routing.module.ts   # Root routing module
    |-- app.component.html      # Root component HTML
