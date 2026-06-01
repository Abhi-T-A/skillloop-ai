# API Documentation

## Authentication

### Register

POST /api/auth/register

Request

{
"name": "Abhi",
"email": "[abhi@gmail.com](mailto:abhi@gmail.com)",
"password": "password123"
}

---

### Login

POST /api/auth/login

Request

{
"email": "[abhi@gmail.com](mailto:abhi@gmail.com)",
"password": "password123"
}

Response

{
"token": "JWT_TOKEN",
"user": {
"id": 1,
"name": "Abhi"
}
}

---

## Study

### Generate Study Guide

POST /api/study/generate

Request

{
"topic": "Spring Boot",
"difficulty": "Beginner"
}

---

### Study History

GET /api/study/history

---

## PDF

### Upload PDF

POST /api/pdf/upload

---

### Generate PDF Questions

POST /api/pdf/generate-questions/{pdfId}

---

### Get PDF Questions

GET /api/pdf/questions/{pdfId}

---

### PDF History

GET /api/pdf/history

---

## Viva

### Start Viva

GET /api/viva/start/{pdfId}

---

### Evaluate Answer

POST /api/viva/evaluate

Request

{
"topic": "Java",
"question": "What is JVM?",
"userAnswer": "Java Virtual Machine"
}

---

### Viva History

GET /api/viva/history

---

### Viva Analytics

GET /api/viva/analytics

---

## Dashboard

GET /api/dashboard
