# 🚀 Cypress E2E Automation Testing

End-to-end automation testing project built using **Cypress** to ensure application quality, stability, and faster regression testing.

This project focuses on validating real user flows, handling edge cases, and implementing maintainable automation practices.

---

## 📌 Key Features

- ✅ End-to-End Testing (User Flow)
- ✅ Positive & Negative Test Cases
- ✅ Form Validation Testing
- ✅ UI & Functional Testing
- ✅ Error Handling Validation

---

## 🔍 Test Coverage

- Login & Logout functionality
- Form input validation
- Navigation flow
- Error messages & edge cases

---

## 🛠️ Tech Stack

- Cypress
- JavaScript
- Node.js
- Git & GitHub

---

## 📂 Project Structure
cypress/
│── e2e/
│ ├── login.cy.js
│ ├── form-validation.cy.js
│ └── navigation.cy.js
│
│── fixtures/
│ └── test-data.json
│
│── support/
│ ├── commands.js
│ └── e2e.js
│
package.json
cypress.config.js
README.md

---

## ▶️ How to Run

```bash
# Install dependencies
npm install

# Open Cypress UI
npx cypress open

# Run headless
npx cypress run
