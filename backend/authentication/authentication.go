package authentication

import (
	"fmt"
	"net/http"
	"time"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var secretKey = []byte("secret-key")

func createToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": username,
			"exp":      time.Now().Add(time.Millisecond * 2).Unix(),
		})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func Login(c *gin.Context) {
	var user models.Users
	var credentials Credentials
	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := db.DB.Where("email = ?", credentials.Email).First(&user)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "no record found"})
		return
	}
	match := CheckPasswordHash(credentials.Password, user.Password)
	tokenString, err := createToken(credentials.Email)
	fmt.Print("Match:", match)
	if match {
		c.JSON(http.StatusOK, gin.H{"message": "successfully logged in", "owner_role": user.Role, "token": tokenString})

	} else {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Incorrect Password", "error": err})
	}
}
