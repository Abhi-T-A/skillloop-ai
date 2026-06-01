# Database Schema

## users

| Column     | Type      |
| ---------- | --------- |
| id         | BIGINT    |
| name       | VARCHAR   |
| email      | VARCHAR   |
| password   | VARCHAR   |
| role       | VARCHAR   |
| created_at | TIMESTAMP |

---

## study_sessions

| Column     | Type    |
| ---------- | ------- |
| id         | BIGINT  |
| topic      | VARCHAR |
| difficulty | VARCHAR |

---

## pdf_study_sessions

| Column         | Type    |
| -------------- | ------- |
| id             | BIGINT  |
| file_name      | VARCHAR |
| extracted_text | TEXT    |

---

## pdf_questions

| Column   | Type   |
| -------- | ------ |
| id       | BIGINT |
| pdf_id   | BIGINT |
| question | TEXT   |
| answer   | TEXT   |

---

## viva_results

| Column      | Type    |
| ----------- | ------- |
| id          | BIGINT  |
| topic       | VARCHAR |
| question    | TEXT    |
| user_answer | TEXT    |
| score       | INTEGER |
| feedback    | TEXT    |
