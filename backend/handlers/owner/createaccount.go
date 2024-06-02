package owner

import (
	"net/http"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// Creating Account
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// CheckPasswordHash compares a password to a hash and returns if it is valid or not.
//
//	func CheckPasswordHash(password, hash string) bool {
//		err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
//		return err == nil
//	}
func CreateAccount(c *gin.Context) {

	// match := CheckPasswordHash(password, hash)
	// fmt.Println("Match:   ", match)
	var request struct {
		LibraryName   string `json:"library_name"`
		OwnerName     string `json:"owner_name"`
		OwnerPassword string `json:"password"`
		OwnerEmail    string `json:"owner_email"`
		OwnerPhone    string `json:"owner_phone"`
		OwnerRole     string `json:"owner_role"`
	}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Fetch the existing library
	var existingLibrary models.Library
	if err := db.DB.Where("name = ?", request.LibraryName).First(&existingLibrary).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "library not found"})
		return
	}

	// Check if the owner role is valid (Admin or Reader)
	if request.OwnerRole != "Admin" && request.OwnerRole != "Reader" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid owner role"})
		return
	}

	// Check if the user already exists in the library
	var existingUser models.Users
	if err := db.DB.Where("email = ? AND lib_id = ?", request.OwnerEmail, existingLibrary.ID).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "user already exists in the library"})
		return
	}

	// Check if there is already an admin in the library
	if request.OwnerRole == "Admin" {
		var existingAdmin models.Users
		if err := db.DB.Where("role = ? AND lib_id = ?", "Admin", existingLibrary.ID).First(&existingAdmin).Error; err == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "an admin already exists in the library"})
			return
		}
	}
	password := request.OwnerPassword
	hash, _ := HashPassword(password)
	// fmt.Println("Password:", password)
	// fmt.Println("Hash:    ", hash)
	// Create a new user
	newUser := models.Users{
		Name:          request.OwnerName,
		Email:         request.OwnerEmail,
		Password:      hash,
		ContactNumber: request.OwnerPhone,
		Role:          request.OwnerRole,
		LibID:         existingLibrary.ID,
	}

	if err := db.DB.Create(&newUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create user"})
		return
	}

	// Respond with success message and user ID
	c.JSON(http.StatusCreated, gin.H{"message": "user created successfully", "user_id": newUser.ID, "library_id": existingLibrary.ID})
}
