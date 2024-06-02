package admin

import (
	"bytes"
	"encoding/json"
	"net/http"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

func AddBook(c *gin.Context) {
	var request struct {
		Book       models.BookInventory `json:"book"`
		AdminEmail string               `json:"email"`
	}
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//Checking for email of admin whether entered email matches with admin email or not
	var existingEmail models.Users
	result1 := db.DB.Where("email =? AND role=?", request.AdminEmail, "Admin").First(&existingEmail)
	if result1.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin email is incorrect"})
		return
	}

	//Checking Presence Of Book
	var existingBook models.BookInventory
	var existingLibraryID models.Library
	result := db.DB.Where("isbn =?", request.Book.ISBN).First(&existingBook)

	if result.RowsAffected == 0 && request.Book.TotalCopies < request.Book.AvailableCopies {
		c.JSON(http.StatusForbidden, gin.H{"error": "total copies cannot be less than available copies"})
		return
	}
	result2 := db.DB.Where("id=?", request.Book.LibID).First(&existingLibraryID)
	if result2.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "library not found"})
		return
	}
	if result.RowsAffected > 0 && (request.Book.TotalCopies >= request.Book.AvailableCopies) && result2.RowsAffected > 0 && request.Book.LibID == existingLibraryID.ID {
		existingBook.TotalCopies += request.Book.TotalCopies
		existingBook.AvailableCopies += request.Book.AvailableCopies
		if err := db.DB.Save(&existingBook).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "failed to update book"})
			return
		}
		if err := sendTeamsNotification("https://xenonstack1.webhook.office.com/webhookb2/f31c7aab-4faa-4c1f-a216-e7eeb0b2fe89@7ff914bc-ca07-4c28-8277-73e20a4966c7/IncomingWebhook/237010bb92934594a1f0ff278b2804aa/4158b6ff-fddb-4099-baf1-2a992bd0ae2d", "Book Added", "A copy ofexisting book has been added", request.Book.Title, request.Book.Authors); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send notification on team"})
			return
		}
		c.JSON(http.StatusOK, existingBook)
		return
	}

	if err := db.DB.Create(&request.Book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to add book"})
		return
	} else {
		c.JSON(http.StatusCreated, request.Book)
	}

	if err := sendTeamsNotification("https://xenonstack1.webhook.office.com/webhookb2/f31c7aab-4faa-4c1f-a216-e7eeb0b2fe89@7ff914bc-ca07-4c28-8277-73e20a4966c7/IncomingWebhook/237010bb92934594a1f0ff278b2804aa/4158b6ff-fddb-4099-baf1-2a992bd0ae2d", "Book Added", "A new book has been added", request.Book.Title, request.Book.Authors); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send notification on team"})
		return
	}

}

func sendTeamsNotification(webhookURL, title, subtitle, bookTitle, bookAuthor string) error {
	teamsPayload := map[string]interface{}{
		"@type":      "MessageCard",
		"@context":   "http://schema.org/extensions",
		"themeColor": "0076D7",
		"summary":    title,
		"sections": []map[string]string{
			{"activityTitle": title,
				"activitySubtitle": subtitle,
				"text":             "Title:" + bookTitle + "\n Author:" + bookAuthor,
			},
		},
	}
	//converting payload to json format

	payloadJSON, err := json.Marshal(teamsPayload)
	if err != nil {
		return err
	}

	// final statement to send teams message
	_, err = http.Post(webhookURL, "application/json", bytes.NewBuffer(payloadJSON))
	if err != nil {
		return err
	}
	return nil
}
