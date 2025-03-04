# 📽️ Movie Management System  

## 🚀 Project Requirements  

### 🎬 **Movies Module**  
- Display a list of all movies with:  
  - **Keyword search**  
  - **Sorting by rating** (ascending/descending)  
  - **Pagination support**  
- View **detailed information** for a single movie  
- **Add** a new movie  
- **Update** movie details  
- **Delete** a movie  

### ⭐ **Reviews Module (Extended Feature)**  
- Add a **comment** and **rating** for a movie  
- Retrieve **all reviews** for a specific movie  

---

## 📡 API Endpoints  

### 🎞️ **Movies**  
| Method | Endpoint                | Status Code | Description |
|--------|-------------------------|-------------|-------------|
| `GET`  | `/v1/movies`            | `200`       | Retrieve a list of movies with filtering & sorting |
| `POST` | `/v1/movies`            | `201`       | Add a new movie |
| `GET`  | `/v1/movies/:id`        | `200`       | Get details of a specific movie |
| `PUT`  | `/v1/movies/:id`        | `200`       | Update an existing movie |
| `DELETE` | `/v1/movies/:id`      | `204`       | Delete a movie |

### ⭐ **Reviews**  
| Method | Endpoint                     | Status Code | Description |
|--------|------------------------------|-------------|-------------|
| `POST` | `/v1/movies/:id/reviews`     | `201`       | Add a review to a movie |
| `GET`  | `/v1/movies/:id/reviews`     | `200`       | Retrieve all reviews for a movie |

---

## 🔍 **Query Parameters for `/v1/movies`**  
| Parameter | Type   | Description |
|-----------|--------|-------------|
| `limit`   | Number | Number of results per page (default: `10`) |
| `page`    | Number | Page number (e.g., `1, 2, 3`) |
| `sort`    | String | Sorting order (`rating` for ascending, `-rating` for descending) |
| `q`       | String | Search by keyword |

**Example Usage:**  
```
GET /v1/movies?limit=10&page=1&sort=-rating&q=Inception
```

---

## 🎭 **Movie Data Format**  

```javascript
const movies = [
  {
    id: 1,
    title: "Inception",
    description: "A skilled thief steals secrets from dreams.",
    types: ["Sci-Fi"],
    averageRating: 4.5,
    reviews: [
      { id: 1, content: "Amazing movie!", rating: 5 },
      { id: 2, content: "Great visuals.", rating: 4 }
    ]
  }
];
```
