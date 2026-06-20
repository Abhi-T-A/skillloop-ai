# SkillLoop AI 🚀

AI-powered learning platform that helps students generate study guides, learn from PDFs, practice AI-based viva interviews, and track learning performance.

---

# 📌 Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Token Authentication
* BCrypt Password Encryption
* Protected API Endpoints

## 📚 Study Guide Generator

* AI-generated Study Guides
* Topic-based Question Generation
* Difficulty-based Learning
* Study Session History Tracking

## 📄 PDF Learning

* PDF Upload
* PDF Text Extraction using Apache PDFBox
* AI-generated Questions from PDFs
* PDF Study Session History

## 🎤 AI Viva

* Viva Question Generation
* AI-based Answer Evaluation
* Feedback Generation
* Performance Scoring
* Viva History Tracking

## 📊 Dashboard Analytics

* Total Study Sessions
* Total PDF Sessions
* Total Viva Attempts
* Average Performance Score
* Learning Analytics

## 📖 API Documentation

* Swagger UI Integration
* OpenAPI 3 Documentation
* Interactive API Testing

---

# 🏗️ System Architecture

Frontend (React - Planned)

⬇️

REST APIs (Spring Boot)

⬇️

Service Layer

⬇️

Repository Layer (JPA)

⬇️

PostgreSQL Database

⬇️

External AI Services

* Google Gemini API
* Hugging Face API

---

# 🛠️ Tech Stack

## Backend

* Java 17
* Spring Boot 3.5
* Spring Security
* Spring Data JPA
* Hibernate ORM
* REST APIs
* Maven

## Authentication & Security

* JWT Authentication
* BCrypt Password Encoder
* Stateless Session Management

## Database

* PostgreSQL

## AI & NLP

* Google Gemini API
* Hugging Face Inference API

## PDF Processing

* Apache PDFBox

## Documentation

* Swagger UI
* OpenAPI 3

## Development Tools

* IntelliJ IDEA
* Postman
* Git
* GitHub

## Design Patterns & Architecture

* Controller-Service-Repository Architecture
* DTO Pattern
* Dependency Injection
* Entity Relationship Mapping (JPA)

---

# 📂 Project Structure

```text
skillloop-ai
│
├── Backend
│   ├── config
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   ├── service
│   ├── exception
│   └── resources
│
├── frontend (Coming Soon)
│
├── docs
│
└── README.md
```

---

# 🗄️ Database Tables

| Table Name         | Description             |
| ------------------ | ----------------------- |
| users              | User Accounts           |
| study_sessions     | Study History           |
| pdf_study_sessions | Uploaded PDF Sessions   |
| pdf_questions      | Generated PDF Questions |
| viva_results       | Viva Evaluation Results |

---

# ⚙️ Setup & Installation

## Clone Repository

```bash
git clone https://github.com/Abhi-T-A/skillloop-ai.git
```

## Navigate to Backend

```bash
cd Backend
```

## Configure PostgreSQL

Create Database:

```sql
CREATE DATABASE skillloop_ai;
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/skillloop_ai
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
```

---

# ▶️ Run Application

```bash
./mvnw spring-boot:run
```

Or

```bash
mvn spring-boot:run
```

---

# 📖 API Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

OpenAPI JSON:

```text
http://localhost:8080/v3/api-docs
```

---

# 🔗 API Modules

## Auth APIs

* Register User
* Login User
* JWT Authentication

## Study APIs

* Generate Study Guides
* View Study History

## PDF APIs

* Upload PDF
* Extract PDF Content
* Generate Questions
* View PDF History

## Viva APIs

* Start Viva Session
* Evaluate Answers
* View Viva History
* Performance Analytics

## Dashboard APIs

* Learning Analytics
* User Performance Overview

---

# ✅ Completed Backend Features

* JWT Authentication
* User Management
* PostgreSQL Integration
* AI Study Guide Generator
* PDF Processing
* AI Viva Evaluation
* Dashboard Analytics
* Swagger Documentation
* Global Exception Handling
* Layered Architecture

---

# 🚀 Future Enhancements

* React Frontend
* Refresh Token Authentication
* Role-Based Access Control (RBAC)
* Docker Support
* CI/CD Pipeline
* AWS Deployment
* User Profile Management
* Study Progress Tracking
* AI Learning Recommendations

---

# 👨‍💻 Author

**Abhi T A**

Backend Developer | Java | Spring Boot | PostgreSQL | AI Integration

GitHub:
https://github.com/Abhi-T-A

---

# ⭐ Project Status

✅ Backend Development Completed

✅ Authentication Implemented

✅ Database Integrated

✅ Swagger Documentation Ready

✅ APIs Tested Successfully

✅ Frontend Development
(incompleted)
