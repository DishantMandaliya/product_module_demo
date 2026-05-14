# ERP Product Management Module

A complete, production-ready product management module for ERP systems built with React, TypeScript, and Tailwind CSS. This module provides full CRUD operations, search/filtering capabilities, and data persistence using localStorage.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage Guide](#usage-guide)
- [API Reference](#api-reference)
- [Component Documentation](#component-documentation)
- [State Management](#state-management)
- [Styling Approach](#styling-approach)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Core Functionality
- **Product Listing**: View all products in a sortable, responsive table with status indicators
- **Add Product**: Create new products with comprehensive form validation
- **Edit Product**: Update existing product information
- **Delete Product**: Remove products with confirmation modal to prevent accidental deletions
- **Product Details**: Dedicated page showing complete product information
- **Search & Filter**: 
  - Search by product name or SKU (real-time)
  - Filter by category
  - Filter by status (Active/Inactive/Draft)

### Dashboard Analytics
- **Statistics Cards**: 
  - Total products count
  - Total inventory stock
  - Total inventory value
  - Active products count
- **Recent Products**: Quick view of latest 5 products
- **Category Breakdown**: Visual distribution of products by category
- **Low Stock Alerts**: Automatic warning for products with stock < 20 units

### Data Management
- **Mock Data**: Pre-loaded with 8 sample products for demonstration
- **Local Storage**: All changes persist in browser's localStorage
- **No Backend Required**: Works completely offline

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 5.2.2 | Type safety |
| React Router DOM | 6.20.0 | Navigation & routing |
| Tailwind CSS | 3.4.0 | Styling |
| Vite | 5.0.8 | Build tool |
| UUID | 9.0.1 | Unique ID generation |

## 📁 Project Structure
erp-product-module/
│
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── Layout/ # Layout components
│ │ │ ├── Navbar.tsx # Top navigation bar
│ │ │ └── Sidebar.tsx # Side navigation menu
│ │ └── Products/ # Product-specific components
│ │ ├── ProductList.tsx # Product table view
│ │ ├── ProductForm.tsx # Add/Edit form
│ │ ├── ProductDetails.tsx # Detailed product view
│ │ ├── SearchFilter.tsx # Search/filter UI
│ │ └── DeleteConfirmModal.tsx # Delete confirmation
│ │
│ ├── pages/ # Page components
│ │ ├── Dashboard.tsx # Analytics dashboard
│ │ ├── ProductsPage.tsx # Main product listing
│ │ ├── AddProductPage.tsx # Add product form
│ │ ├── EditProductPage.tsx # Edit product form
│ │ └── ProductDetailPage.tsx # Product details view
│ │
│ ├── hooks/ # Custom React hooks
│ │ └── useLocalStorage.ts # localStorage persistence
│ │
│ ├── types/ # TypeScript type definitions
│ │ └── index.ts # All TypeScript interfaces
│ │
│ ├── utils/ # Utility functions
│ │ └── validation.ts # Form validation logic
│ │
│ ├── data/ # Mock data
│ │ └── mockProducts.ts # Sample product data
│ │
│ ├── App.tsx # Main app component
│ ├── main.tsx # Entry point
│ └── index.css # Global styles
│
├── public/ # Static assets
├── index.html # HTML template
├── package.json # Dependencies
├── tsconfig.json # TypeScript config
├── tailwind.config.js # Tailwind CSS config
├── vite.config.ts # Vite config
└── README.md # Documentation


## 🚀 Installation

### Prerequisites
- **Node.js**: v16 or higher ([Download](https://nodejs.org/))
- **npm**: v7 or higher (comes with Node.js)
- **Git**: For cloning the repository (optional)

### Step-by-Step Installation

1. **Clone or download the project**
```bash
# Clone the repository (if using Git)
git clone https://github.com/yourusername/erp-product-module.git

# Or download the ZIP file and extract it