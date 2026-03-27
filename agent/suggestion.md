# Frontend Development Guide for MiMo V2-Pro

This file contains specific instructions for MiMo V2-Pro (frontend developer) on what features to implement based on the available backend endpoints.

## Available Backend Endpoints

Based on the current backend implementation by kimi k2.5, the following endpoints are available:

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (returns JWT)
- `GET /api/auth/me` - Get current user profile (requires JWT)

### User Profile Endpoints
- `GET /api/user/profile` - Get detailed user profile
- `PUT /api/user/profile` - Update user profile (name, bio, avatarUrl)
- `POST /api/user/change-password` - Change password
- `DELETE /api/user/account` - Delete account

### Saved Comparisons Endpoints
- `GET /api/comparisons` - Get all saved comparisons
- `POST /api/comparisons` - Save new comparison
- `PUT /api/comparisons/:id` - Update saved comparison
- `DELETE /api/comparisons/:id` - Delete saved comparison

### Alerts Endpoints
- `GET /api/alerts` - Get all alerts
- `POST /api/alerts` - Create new alert
- `PUT /api/alerts/:id` - Update alert
- `DELETE /api/alerts/:id` - Delete alert

### Notes Endpoints
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Templates Endpoints
- `GET /api/templates` - Get all templates
- `POST /api/templates` - Create new template
- `DELETE /api/templates/:id` - Delete template

## Features for MiMo V2-Pro to Implement

### 1. User Authentication & Profile (Priority: High)

Implement in `src/context/AuthContext.tsx`:
- Login/Register forms (already done)
- Profile viewing and editing
- Password change functionality
- Account deletion
- Bio and avatar fields in user profile

### 2. Saved Comparisons Feature (Priority: High)

Create new components and pages:
- `SavedComparisonsPage.tsx` - List all saved comparisons
- `SaveComparisonModal.tsx` - Modal to save current comparison
- Update comparison and platform detail pages with save functionality

### 3. Alerts System (Priority: Medium)

Create:
- `AlertsPage.tsx` - View and manage alerts
- `CreateAlertModal.tsx` - Set up new platform threshold alerts
- Alert badge/notifications in navbar

### 4. Personal Notes & Templates (Priority: Medium)

Create:
- `NotesPage.tsx` - View and manage personal notes
- `AddNoteModal.tsx` - Add notes to platforms/comparisons
- `TemplatesPage.tsx` - Manage comparison templates
- `SaveAsTemplateButton` in comparison views

### 5. UI/UX Enhancements (Based on previous suggestions)

Continue implementing:
- Dark mode with system preference
- Enhanced hover/focus states
- Skeleton loaders
- Toast notifications
- Keyboard navigation
- Breadcrumbs
- Motion animations with Framer Motion

### 6. Additional Improvements

Implement:
- Export functionality for saved comparisons
- Improved search and filtering
- Extended platform categories (streaming, productivity, etc.)
- Share functionality for saved comparisons

## Component Integration Points

### AuthContext
- Use `useAuth()` hook throughout the app
- Check `isAuthenticated` for protected features
- Use `login`, `register`, `logout` functions
- Access `user` object for profile data

### API Service Layer
Create a service layer for API calls:
```typescript
// Example pattern for user profile
const updateProfile = async (data) => {
  const response = await fetch('/api/user/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  return response.json();
};
```

### Protected Routes
Wrap components that require authentication:
```typescript
{isAuthenticated ? (
  <SavedComparisonsButton />
) : (
  <LoginPrompt message="Save comparisons by creating an account" />
)}
```

## Priority Implementation Order

### Week 1: Core User Features
1. Profile viewing/editing page
2. Password change form
3. Account deletion confirmation
4. Bio and avatar display

### Week 2: Saved Comparisons System
1. Save comparison button on platform detail page
2. Save comparison modal
3. Saved comparisons listing page
4. Delete saved comparison functionality

### Week 3: Alerts & Notes
1. Alerts management page
2. Create alert modal (for platform thresholds)
3. Notes on platform detail pages
4. Notes listing page

### Week 4: Templates & Polish
1. Comparison templates system
2. Export functionality
3. Enhanced search/filtering
4. Share saved comparisons

## Security Considerations for Frontend

1. **Token Storage**: Store JWT in localStorage (already implemented)
2. **Token Expiry**: Handle 401 responses by redirecting to login
3. **CSRF Protection**: Backend handles this, but be aware
4. **Input Sanitization**: Sanitize user inputs before display
5. **Error Handling**: Graceful error handling for API failures

## UI Component Checklist

[ ] Profile page with edit functionality
[ ] Password change form
[ ] Account deletion with confirmation
[ ] Save comparison button on platform cards/details
[ ] Saved comparisons listing page
[ ] Alerts management system
[ ] Notes on platforms and comparisons
[ ] Comparison templates
[ ] Export saved comparisons
[ ] Enhanced search and filtering
[ ] Share saved comparisons
[ ] Bio and avatar display in user profile
[ ] Toast notifications for all actions
[ ] Skeleton loaders for async operations
[ ] Keyboard navigation improvements
[ ] Motion animations for transitions
[ ] Dark mode consistency across new components

## Testing Guidelines

1. Test all auth flows (login/register/profile)
2. Test CRUD operations for each feature
3. Test error states (401, 400, 500 responses)
4. Test loading states with skeleton UI
5. Test empty states for lists
6. Test form validation
7. Test responsive behavior
8. Test dark/light mode switching
9. Test keyboard navigation
10. Test toast notifications

By implementing these features based on the available backend endpoints, MiMo V2-Pro will create a complete, valuable experience that leverages the full capabilities of the SocialPair application.