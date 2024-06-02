package reader

import (
	"net/http"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

func SearchBook(c *gin.Context) {
	var request struct {
		Title     string `json:"title"`
		Author    string `json:"authors"`
		Publisher string `json:"publisher"`
	}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// search for books matching

	var books models.BookInventory
	result := db.DB.Where("title LIKE ?", "%"+request.Title+"%").
		Where("authors LIKE ?", "%"+request.Author+"%").
		Where("publisher LIKE ?", "%"+request.Publisher+"%").Find(&books)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not available"})
		return
	}
	c.JSON(http.StatusOK, books)

}
