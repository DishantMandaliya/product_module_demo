export interface Product {
  id?: string;
    productid?: string;
    product_id?: string;
    product_name: string;
    productName?: string;
    sku: string;
    category: number | string;  // Can be number (ID) or string for display
    category_name?: string;      // For display purposes
    stock_quantity: number;
    stockQuantity?: number;
    unit_price: number;
    unitPrice?: number;
    description: string;
    Description?: string;        // Note: Your backend uses capital D
    status: number | string;     // 1: Active, 2: Inactive, 3: Draft
    status_name?: string;        // For display purposes
    created_at?: string;
    createdAt?: string;
    updated_at?: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data: any;
    token: string | null;
}

export interface ProductFormData {
    product_name: string;
    sku: string;
    category: number;     
    stock_quantity: number;
    unit_price: number;
    Description: string;   
    status: number;         
}

export interface FilterOptions {
    searchTerm: string;
    category: string;
    status: string;
}

export interface ValidationErrors {
    product_name?: string;
    sku?: string;
    category?: string;
    stock_quantity?: string;
    unit_price?: string;
    status?: string;
    Description?: string;
}

// Category mapping (ID to Name)
export const CategoryMap: { [key: number]: string } = {
    1: 'Electronics',
    2: 'Clothing',
    3: 'Furniture',
    4: 'Books',
    5: 'Other'
};

// Status mapping (ID to Name)
export const StatusMap: { [key: number]: string } = {
    1: 'Active',
    2: 'Inactive',
    3: 'Draft'
};

// Reverse mappings for dropdowns
export const CategoryOptions = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Furniture' },
    { id: 4, name: 'Books' },
    { id: 5, name: 'Other' }
];

export const StatusOptions = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' },
    { id: 3, name: 'Draft' }
];

// Dashboard Statistics Interface
export interface DashboardStatistics {
    totalproducts: number;
    totalstock: number;
    inventoryvalue: number;
    activeproducts: number;
}

// Recent Product Interface
export interface RecentProduct {
    productid: string;
    product_name: string;
    sku: string;
    category: string;
    stock_quantity: number;
    unit_price: number;
    status: string;
    created_at: string;
}

// Category Wise Data Interface
export interface CategoryWiseData {
    category: number;
    category_name: string;
    product_count: number;
}

// Complete Dashboard Data Interface
export interface DashboardData {
    statistics: DashboardStatistics;
    recentProducts: RecentProduct[];
    categoryData: CategoryWiseData[];
}