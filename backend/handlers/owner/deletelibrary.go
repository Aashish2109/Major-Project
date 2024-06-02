package owner

import (
	"fmt"
	"net/http"
	"strconv"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

// DeleteLibrary deletes an existing library
func DeleteLibrary(c *gin.Context) {
	// Get the library ID from the request parameters
	libraryID, err := strconv.ParseUint(c.Param("library_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid library ID"})
		return
	}

	// Check if the library exists
	var existingLibrary models.Library
	if err := db.DB.First(&existingLibrary, libraryID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "library not found"})
		return
	}

	// Delete the library
	if err := db.DB.Delete(&existingLibrary).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete library"})
		return
	}

	// Respond with success message
	c.JSON(http.StatusOK, gin.H{"message": "library deleted successfully"})
	existingLibrary.ID--
	fmt.Print(existingLibrary.ID)
}
