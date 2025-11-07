# UVAS - AI Development Guide

This document provides essential context for AI agents working in the UVAS (Gestión de pedidos y clientes para vendedoras de cosméticos) codebase.

## Project Overview

UVAS is a Next.js-based web application for managing cosmetics sales, customers, and orders. It uses TypeScript and follows a modern React architecture with the App Router pattern.

### Key Features
- Customer management
- Order tracking
- Profile handling
- Product catalog (planned)
- Payment tracking (planned)

## Architecture & Technical Stack

### Frontend Stack
- Next.js 15.5 with App Router
- React 18.3
- TypeScript 5.9
- CSS Modules for styling
- File-based routing under `src/app/`

### Data Layer
- Local CSV storage (`data/clientes.csv`)
- API routes in `src/app/api/`
- Frontend API client in `src/api.ts`

## Project Structure

```
src/
├── api.ts                 # Frontend API client functions
├── app/                   # Next.js App Router pages
│   ├── api/              # API route handlers
│   ├── clientes/         # Customer management
│   ├── pedidos/          # Order management
│   ├── profile/          # User profile
│   ├── custom.css        # Global styles
│   └── layout.tsx        # Root layout with Poppins font
```

## Development Patterns

### State Management
- Use React's useState for component-level state
- Implement forms with controlled components
- Handle async operations with try/catch and loading states

### Styling Conventions
- Use CSS custom properties for brand colors (--uva-*)
- Responsive design with mobile-first approach
- Common components styled via `custom.css`

### Form Handling Pattern
```tsx
const [items, setItems] = useState<Item[]>([
  { id: Date.now(), /* initial state */ }
]);

const handleChange = (id: number, field: keyof Item, value: T) => {
  setItems(prev => prev.map(item => 
    item.id === id ? { ...item, [field]: value } : item
  ));
};
```

### Data Persistence Pattern
- API routes handle data operations
- CSV files store persistent data
- Frontend components make API calls through `src/api.ts` client

## Important Workflows

### Development
```bash
pnpm dev     # Start development server
pnpm build   # Build for production
pnpm start   # Run production server
```

### Customer Data Flow
1. UI components in `src/app/clientes/page.tsx`
2. API endpoint handling in `src/app/api/clientes/route.ts`
3. Data storage in `data/clientes.csv`

## Best Practices

1. Always use TypeScript interfaces for data structures
2. Follow mobile-first responsive design patterns
3. Implement loading and error states for async operations
4. Use semantic HTML elements and ARIA attributes for accessibility
5. Keep components focused and single-responsibility

## Common Issues & Solutions

1. CSV data persistence requires proper error handling and atomic writes
2. Mobile layout requires careful styling with `custom.css` breakpoints
3. Form state management should follow the established patterns with `useState`