package db

import (
	"fmt"

	"example.com/my-app/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	dsn := "root:21092001@Aavya@tcp(127.0.0.1:3306)/Aashish?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("ERROR WHILE CONNECTING...")
	}

	fmt.Println("database connected")
	DB.AutoMigrate(&models.Library{})
	DB.AutoMigrate(&models.Users{})
	DB.AutoMigrate(&models.BookInventory{})
	DB.AutoMigrate(&models.RequestEvents{})
	DB.AutoMigrate(&models.IssueRegistry{})
}
