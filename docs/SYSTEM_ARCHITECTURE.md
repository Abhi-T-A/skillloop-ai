# System Architecture

Frontend (React)

↓

REST API Layer

(Spring Boot Controllers)

↓

Service Layer

(Business Logic)

↓

Repository Layer

(Spring Data JPA)

↓

PostgreSQL Database

↓

External AI Services

* Gemini API
* Hugging Face API

---

## Request Flow

User

↓

Frontend

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Response Returned

---

## Modules

### Authentication Module

Register, Login, JWT Validation

### Study Module

Generate Questions and Answers

### PDF Module

PDF Upload and Processing

### Viva Module

Interview Simulation and Evaluation

### Dashboard Module

Analytics and Performance Tracking
