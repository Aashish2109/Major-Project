package admin

import (
	"net/http"
	"strconv"
	"time"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

func ListIssueRequests(c *gin.Context) {
	var issueRequests []models.RequestEvents

	//FETCH REQUEST FROM DB

	if err := db.DB.Find(&issueRequests).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch issue requests"})
		return
	}
	c.JSON(http.StatusOK, issueRequests)
}

//Request Approval

func ApproveIssueRequest(c *gin.Context) {
	requestID, err := strconv.ParseUint(c.Param("request_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request ID"})
		return
	}
	var request models.RequestEvents
	if err := db.DB.First(&request, requestID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "request not found"})
		return
	}

	//Update request details
	var book models.BookInventory
	result1 := db.DB.Where("isbn = ?", request.BookID).First(&book)
	request.ApprovalDate = time.Now()
	request.ApproverID = 1
	if err := db.DB.Save(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to approve request"})
		return
	}
	var issueRegisty models.IssueRegistry
	//putting values in issue registry
	result := db.DB.Where("reader_id = ?", requestID).First(&issueRegisty)
	if result.RowsAffected == 0 {
		issueRegistry := models.IssueRegistry{
			ISBN:               request.BookID,
			ReaderID:           request.ReaderID,
			IssueApproverID:    request.ApproverID,
			IssueStatus:        "APPROVED",
			IssueDate:          time.Now(),
			ExpectedReturnDate: time.Now(),
			ReturnDate:         time.Now(),
			ReturnApproverID:   request.ApproverID,
		}
		if err := db.DB.Create(&issueRegistry).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create issue request"})
			return
		}

	} else {
		if err := db.DB.Where("reader_id = ?", request.ReaderID).First(&issueRegisty).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to find issue registry"})
			return
		}

		issueRegisty.IssueStatus = "Approved"
		issueRegisty.IssueDate = time.Now()

		if err := db.DB.Save(&book).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update book availability"})
			return
		}

		if err := db.DB.Save(&issueRegisty).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update issue registry"})
			return
		}
	}
	if result1.RowsAffected > 0 && book.AvailableCopies > 0 {
		book.AvailableCopies--
		c.JSON(http.StatusOK, gin.H{"message": "issue request approved successfully"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "books not available"})
	}
	if err := db.DB.Save(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update book availability"})
		return
	}

}

// Reject The Request
func RejectIssueRequest(c *gin.Context) {
	requestID, err := strconv.ParseUint(c.Param("request_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errror": "invalid request id"})
		return
	}

	var request models.RequestEvents
	if err := db.DB.First(&request, requestID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "request not found"})
		return
	}
	// Delete request
	if err := db.DB.Delete(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "issue request rejected successfully"})
}
