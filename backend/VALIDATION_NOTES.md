# Backend Validation Notes

## Auth Endpoints Updated
- `POST /api/auth/register`
- `POST /api/auth/login`

## Register Validation
- `name`, `email`, and `password` are required.
- Email format must be valid.
- Password strength rule:
  - minimum 8 characters
  - at least one uppercase letter
  - at least one lowercase letter
  - at least one number
  - at least one symbol
- Duplicate-user check is case-insensitive on email.
- Saved email is normalized to lowercase.
- Saved name is trimmed.

## Login Validation
- `email` and `password` are required.
- Email format must be valid.
- User lookup is case-insensitive on email.

## Implementation Detail
- Shared helper functions are added in `controllers/authController.js` for:
  - email regex validation
  - password-strength regex validation
  - safe case-insensitive email lookup
