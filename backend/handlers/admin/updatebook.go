package admin

import (
	"net/http"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

func UpdateBook(c *gin.Context) {
	var request struct {
		ISBN           string               `json:"isbn"`
		UpdatedDetails models.BookInventory `json:"updated_details"`
	}
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	var book models.BookInventory
	result := db.DB.Where("isbn=?", request.ISBN).First(&book)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "no specific ISBN book is present"})
		return
	}

	if request.UpdatedDetails.TotalCopies < request.UpdatedDetails.AvailableCopies {
		c.JSON(http.StatusForbidden, gin.H{"error": "total copies can not be less than available copies"})
		return
	}
	if err := db.DB.Model(&book).Updates(request.UpdatedDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update details in book"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "record updated successfully", "updated_details": book})
}
