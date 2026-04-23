## ADDED Requirements

### Requirement: Theme toggle button

The application SHALL display a theme toggle button in the page header area. The button SHALL show a sun icon when the current theme is dark (indicating a switch to light) and a moon icon when the current theme is light (indicating a switch to dark). Clicking the button SHALL immediately switch between light and dark themes.

#### Scenario: Toggle from dark to light

- **WHEN** user clicks the theme toggle button while the current theme is dark
- **THEN** the application theme SHALL change to light and the button icon SHALL change to a moon icon

#### Scenario: Toggle from light to dark

- **WHEN** user clicks the theme toggle button while the current theme is light
- **THEN** the application theme SHALL change to dark and the button icon SHALL change to a sun icon

### Requirement: Theme applied via data-theme attribute

The application SHALL apply the selected theme by setting the data-theme attribute on the html element to either "light" or "dark". The html element SHALL NOT have a hardcoded data-theme value in index.html.

#### Scenario: Theme attribute reflects current selection

- **WHEN** the application initializes or the user toggles the theme
- **THEN** the html element data-theme attribute SHALL match the active theme value ("light" or "dark")

### Requirement: Theme preference persistence

The application SHALL persist the user's theme preference to localStorage. On subsequent visits, the application SHALL restore the previously selected theme from localStorage.

#### Scenario: Theme preference saved on toggle

- **WHEN** user toggles the theme to light
- **THEN** the localStorage SHALL store the value "light" for the theme preference key

#### Scenario: Theme preference restored on load

- **WHEN** user opens the application and localStorage contains a saved theme preference of "light"
- **THEN** the application SHALL initialize with the light theme

#### Scenario: First visit without saved preference

- **WHEN** user opens the application for the first time and no theme preference exists in localStorage
- **THEN** the application SHALL default to the dark theme

### Requirement: Theme-aware card styling

The YoubikeCardItem component SHALL use DaisyUI semantic color classes instead of hardcoded dark-only Tailwind color classes. The card background, title color, and description text color SHALL adapt automatically when the theme changes.

#### Scenario: Card appearance in light theme

- **WHEN** the active theme is light
- **THEN** the YoubikeCardItem cards SHALL display with light-themed background and readable text colors provided by DaisyUI semantic classes

#### Scenario: Card appearance in dark theme

- **WHEN** the active theme is dark
- **THEN** the YoubikeCardItem cards SHALL display with dark-themed background and readable text colors provided by DaisyUI semantic classes

### Requirement: Theme state managed by Pinia store

The application SHALL manage theme state through a dedicated Pinia store named useThemeStore. The store SHALL expose the current theme value, a toggle function, and an initialization function that reads from localStorage.

#### Scenario: Store provides current theme

- **WHEN** any component accesses the theme store
- **THEN** the store SHALL provide the current theme as a reactive string value of either "light" or "dark"

#### Scenario: Store toggle function switches theme

- **WHEN** the store toggle function is called while the current theme is "dark"
- **THEN** the store SHALL update the current theme to "light", persist it to localStorage, and update the html data-theme attribute
