package owner

import (
	"net/http"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

func ListBooks(c *gin.Context) {
	var books []models.BookInventory

	// Fetch all books from the database
	if err := db.DB.Find(&books).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch books"})
		return
	}

	// Respond with the list of books
	c.JSON(http.StatusOK, books)
}
