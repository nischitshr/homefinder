# Validation Notes

## Scope
This note tracks the latest auth-form validation improvements in the frontend.

## Login Validation
- Email is required.
- Email must match a valid email format.
- Password is required.
- Field-level inline error messages are shown below each input.
- A form-level message appears when validation fails: `Please fix the highlighted fields`.

## Register Validation
- Name is required.
- Email is required and must be in valid format.
- Password is required.
- Password strength rule: at least 8 characters, including:
  - one uppercase letter
  - one lowercase letter
  - one number
  - one symbol
- Confirm password is required.
- Confirm password must match password.
- Field-level inline error messages are shown below each input.
- A form-level message appears when validation fails: `Please fix the highlighted fields`.

## Password Visibility
- Password and confirm-password fields support inline eye-icon show/hide toggles.
- No external icon package is required.

## Files Updated
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/index.css`
