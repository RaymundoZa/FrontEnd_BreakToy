# Inventory Management – Frontend

This is the frontend application for the Inventory Management system built as part of the **Breakable Toy I** project at Encora. It allows users to manage products, visualize inventory metrics, and interact with a clean, responsive UI.

## 🚀 Tech Stack

- **TypeScript**
- **React**
- **Vite**
- **Tailwind CSS**
- **Axios**
- **Chart.js**

## 🌐 Features

- 🔍 **Search & Filter**: Filter products by name, category, and stock availability.
- 📦 **Product Management**: Create, update, delete, and restock products with modal forms.
- 📊 **Data Visualization**: See bar charts for stock and pricing per category.
- 🌒 **Dark Mode**: Fully styled interface with Tailwind and dark theme.
- 📱 **Responsive Design**: Mobile-first and fully adaptive layout.

## 📁 Folder Structure

- `src/`
  - `api/`: Axios configuration and API methods
  - `components/`: Reusable UI components (ProductForm, SearchBar, etc.)
  - `assets/`: Logos and images
  - `App.tsx`: Main app logic and routing
  - `main.tsx`: Entry point


## 🔧 Setup & Run

### 1. Install dependencies

```bash
npm install

npm run dev

npm run build
```

The app will be available at: http://localhost:8080

Make sure the backend is running on http://localhost:9090

--- 

### 🔄 API Integration

This frontend connects to a REST API built with Spring Boot.
All API calls are handled using Axios via the methods in src/api/products.ts.

--- 

### 📊 Metrics

We use Chart.js to display:

- Total stock per category
- Average price per category
These charts are automatically updated when product data changes.

--- 

### 📦 Deployment

This project is built with Vite, making it easy to deploy to:

- GitHub Pages
- Netlify / Vercel
- Docker container (with NGINX)
  
---

## 👨‍💻 Author

Raymundo Daniel Zamora Juárez

Encora SPARK Program · 2025
