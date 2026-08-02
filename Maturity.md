# Richardson Maturity Model Evaluation

# Objective

The objective of this assignment is to evaluate the Task Management REST API developed in Practical 4 using the Richardson Maturity Model (RMM). The API is assessed against Levels 0–3, necessary improvements are identified, and compliance with REST principles is documented.

---

# Richardson Maturity Model Evaluation

| Level | Criterion | Does the API Satisfy? | Evidence |
|--------|-----------|----------------------|----------|
| Level 0 | Single endpoint handling all operations | No | The API uses multiple endpoints instead of a single endpoint. |
| Level 1 | Resources are identified using separate URIs | Yes | Endpoints such as `/tasks` and `/tasks/:id` represent resources. |
| Level 2 | Correct HTTP methods (GET, POST, PUT, DELETE) are used | Yes | GET retrieves tasks, POST creates tasks, PUT updates tasks, DELETE removes tasks. |
| Level 2 | Appropriate HTTP status codes are returned | Yes | Uses `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, and `500 Internal Server Error` where applicable. |
| Level 3 | HATEOAS links are included in responses | No | Hypermedia links are not included in the current API responses. |

---

# Current Richardson Maturity Level

**The Task Management API satisfies Richardson Maturity Model Level 2.**

### Justification

- The API exposes resources using meaningful URLs.
- It uses standard HTTP methods correctly.
- It returns appropriate HTTP status codes.
- It does not include HATEOAS links, so it does not satisfy Level 3.

---

# Level 2 Improvements

The following improvements were verified in the API:

- Correct HTTP methods are used for every endpoint.
- Proper HTTP status codes are returned.
- Invalid requests return meaningful error messages.
- Resource-based URLs are maintained.
- CRUD operations follow REST principles.

Example status codes:

| Operation     | HTTP Method | Status Code            |
|---------------|-------------|------------------------|
| Get all tasks | GET         | 200 OK                 |
| Get task by ID| GET         | 200 OK / 404 Not Found |
| Create task   | POST        | 201 Created            |
| Update task   | PUT         | 200 OK / 404 Not Found |
| Delete task   | DELETE      | 200 OK / 404 Not Found |

---

# HATEOAS Awareness (Level 3)

If the API were upgraded to Richardson Maturity Model Level 3, each response could include hypermedia links.

Example:

```json
{
  "id": "123",
  "title": "Task A",
//   "completed": false,
  "_links": {
    "self": "/tasks/123",
    // "collection": "/tasks",
    "delete": "/tasks/123"
  }
}
```

The links allow API clients to discover available actions dynamically without prior knowledge of endpoint URLs.

---

# Why Most Production APIs Stop at Level 2

Most production REST APIs stop at Level 2 because it provides an excellent balance between simplicity, maintainability, and usability. While HATEOAS (Level 3) offers better discoverability by embedding links in responses, it also increases implementation complexity and development effort. Modern frontend applications and mobile apps usually know the required endpoints in advance, making HATEOAS unnecessary in many real-world projects. Therefore, most organizations adopt Level 2 REST APIs.

---

# Conclusion

The Task Management API successfully satisfies Richardson Maturity Model Level 2 by following RESTful design principles, using resource-oriented URLs, appropriate HTTP methods, and meaningful HTTP status codes. Although HATEOAS is not implemented, the API is well-structured and aligns with common industry practices for REST API development.

---