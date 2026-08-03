# Student Task & Productivity Dashboard

A sleek, responsive Single Page Application (SPA) built with Vanilla JavaScript, HTML5, and CSS3. This dashboard helps users manage their daily tasks, track goals, organize schedules, and view personal productivity analytics.

## ✨ Features

- **Dashboard**: A central hub providing an overview of your current progress and upcoming activities.
- **Task Management**: Create, track, and manage your daily tasks.
- **Calendar**: Keep track of events and your schedule.
- **Goals Tracking**: Set long-term and short-term goals and monitor your achievements.
- **Analytics**: View statistics and insights about your productivity.
- **Settings**: Customize your dashboard experience.

## 🛠️ Technologies Used

- **HTML5**: Semantic structure for all pages.
- **CSS3**: Custom styling, animations, and responsive layouts without relying on heavy frameworks.
- **JavaScript (Vanilla)**: Features a custom local-first router (`js/router.js`) that handles seamless page transitions without page reloads, utilizing an embedded HTML caching system.

## 🚀 Getting Started

Since this project is built using purely Vanilla web technologies, getting started is incredibly simple:

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   ```

2. **Open the App**
   Navigate to the project folder and simply open `index.html` in your preferred web browser. No local server or build tools are strictly necessary for viewing.
   
## 📁 Project Structure

- `/css` - Contains all stylesheets (e.g., `style.css`, `tasks.css`, etc.)
- `/js` - Contains the core application logic, modular JS files, and custom SPA routing.
  - `/js/modules` - Page-specific scripts (e.g., `tasks.js`, `dashboard.js`).
  - `/js/core` - Reusable core functionalities and state management.
- `/*.html` - HTML files for each view of the dashboard.
- `build_router.js` - A Node.js utility script used to compile the HTML views into the `js/router.js` file for seamless local-first SPA routing.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
