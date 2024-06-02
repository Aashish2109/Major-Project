package main

import (
	"example.com/my-app/authentication"
	"example.com/my-app/db"
	"example.com/my-app/handlers/admin"
	"example.com/my-app/handlers/owner"
	"example.com/my-app/handlers/reader"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()
	server := gin.Default()
	server.Use(cors.Default())
	server.Static("static", "./static")

	//AUTHENTICATION
	server.POST("/login", authentication.Login)
	server.POST("/send-otp", authentication.GenerateAndSendOTP)
	server.POST("/validate-otp/:otp", authentication.ValidateOTP)

	//OWNER
	server.POST("/createlibrary", owner.CreateLibrary)
	server.DELETE("/deletelibrary/:library_id", owner.DeleteLibrary)
	server.GET("/listlibraries", owner.ListLibraries)
	server.GET("/listbooks", owner.ListBooks)
	server.POST("/createaccount", owner.CreateAccount)

	//ADMIN
	server.POST("/add-book", admin.AddBook)
	server.DELETE("/remove-book", admin.RemoveBook)
	server.PATCH("/update-book", admin.UpdateBook)
	server.GET("/listissuerequests", admin.ListIssueRequests)
	server.PUT("/approve-issue-request/:request_id", admin.ApproveIssueRequest)
	server.DELETE("/reject-issue-request/:request_id", admin.RejectIssueRequest)

	//READER
	server.POST("/search/book", reader.SearchBook)
	server.POST("/issue/request", reader.RaiseIssueRequest)

	server.Run(":8080")

}
