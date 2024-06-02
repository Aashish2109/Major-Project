package admin

import (
	"net/http"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

func RemoveBook(c *gin.Context) {
	var request struct {
		ISBN string `json:"isbn"`
	}
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var book models.BookInventory
	result := db.DB.Where("isbn=?", request.ISBN).First(&book)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "no book found"})
		return
	}
	if book.TotalCopies == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "no copies available to delete"})
		return
	}

	if book.AvailableCopies < book.TotalCopies {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot remove copy: issued to someone"})
		return
	}
	book.TotalCopies--
	book.AvailableCopies--
	if err := db.DB.Save(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update book"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "book removed successfully"})
}
