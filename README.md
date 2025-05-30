# HabitQuest

HabitQuest is an application designed to help users track and build healthy habits.

## Key Features

### For Users
*   **Habit Creation and Management**: Easily set up, modify, and organize your daily or recurring habits.
*   **Progress Tracking**: Mark habits as complete and monitor your progress over time.
*   **Data Persistence**: Your habit data and settings are securely stored.
*   **User Authentication**: Secure registration and login to manage your personal habits.
*   **Responsive User Interface**: A modern and easy-to-use interface accessible across different devices.
*   **Progress Visualization**: (Potentially using charts/graphs) View visual representations of your habit completion streaks and history.
*   **Real-time Updates**: (If implemented with WebSockets) See changes reflected instantly.

## Technical Stack

*   **Frontend**: React, Vite, Tailwind CSS, Radix UI and other component libraries.
*   **Backend**: Express.js, TypeScript.
*   **Database**: PostgreSQL (managed with Drizzle ORM, potentially using Neon).
*   **Authentication**: Passport.js (Local Strategy).
*   **Real-time**: WebSockets (if implemented).

## Getting Started

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd HabitQuest
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Database Setup:
    *   Ensure you have a PostgreSQL database running.
    *   Configure your database connection string (e.g., in a `.env` file - check `drizzle.config.ts` for details).
    *   Run database migrations/pushes:
        ```bash
        npm run db:push
        ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## License
MIT 