# Inline Validation

**Description:**
Validating input fields in real-time or on blur, rather than waiting for a full form submission.

**Key Principles:**
- **Timing**: Don't validate *while* the user is typing (unless it's a format mask). Validate on `blur` (leaving the field) or after a pause.
- **Positioning**: Place the message directly below or next to the field.

**Common Patterns:**
- **Real-time Check**: A green check appears as soon as the email format is correct.
- **Password Rules**: A list of requirements (length, number, symbol) that turn green as you type.
