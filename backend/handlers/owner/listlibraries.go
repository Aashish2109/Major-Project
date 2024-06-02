package owner

import (
	"net/http"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

// ListLibraries lists all available libraries
func ListLibraries(c *gin.Context) {
	var libraries []models.Library

	// Fetch all libraries from the database
	if err := db.DB.Find(&libraries).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch libraries"})
		return
	}
	// Respond with the list of libraries
	c.JSON(http.StatusOK, libraries)
}
