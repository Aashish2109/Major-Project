package owner

import (
	"net/http"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

// Creating Library
func CreateLibrary(c *gin.Context) {
	var request struct {
		LibraryName string `json:"library_name"`
	}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//TO CHECK IF LIBRARY ALREADY EXISTS WITH SAME NAME
	var existingLibrary models.Library
	result := db.DB.Where("name = ?", request.LibraryName).Find(&existingLibrary)
	if result.RowsAffected > 0 {
		c.JSON(http.StatusConflict, gin.H{"error": "library already exists!!! please change the name"})
		return
	}

	//CREATING NEW LIBRARY
	newLibrary := models.Library{
		Name: request.LibraryName,
	}

	if err := db.DB.Create(&newLibrary).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create library"})
		return
	}

	// Respond with success message and library ID

	c.JSON(http.StatusCreated, gin.H{"message": "library created successfully", "library_id": newLibrary.ID})

}
