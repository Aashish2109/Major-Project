package reader

import (
	"net/http"
	"time"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

func RaiseIssueRequest(c *gin.Context) {
	var request struct {
		BookID string `json:"book_id"`
		Email  string `json:"email"`
	}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the Book exists
	var book models.BookInventory
	result := db.DB.Where("isbn = ?", request.BookID).First(&book)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "book not found"})
		return
	}
	//Check if the Reader exists
	var col models.Users
	result1 := db.DB.Where("email = ?", request.Email).First(&col)
	if result1.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "this reader does not exists"})
		return
	}

	// Check if the book is available
	if book.AvailableCopies == 0 {
		// Create a new issue request
		issueRequest := models.RequestEvents{

			BookID:      request.BookID,
			ReaderID:    col.ID,
			RequestDate: time.Now(),
			RequestType: "Issue",
		}

		if err := db.DB.Create(&issueRequest).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create issue request"})
			return
		}
		//print issueRequest in json format
		c.JSON(http.StatusCreated, issueRequest)
		return
	}
	if book.AvailableCopies > 0 {
		issueRequest := models.RequestEvents{

			BookID:      request.BookID,
			ReaderID:    col.ID,
			RequestDate: time.Now(),
			RequestType: "Issue",
		}

		if err := db.DB.Create(&issueRequest).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create issue request"})
			return
		}

		//print issueRequest in json format
		c.JSON(http.StatusCreated, issueRequest)
		return
	}
}
