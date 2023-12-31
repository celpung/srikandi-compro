package configs

import (
	"fmt"
	"os"

	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dbUser := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPassword, dbHost, dbPort, dbName)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	DB = db
}

func AutoMigrage() {
	ConnectDatabase()

	if migrateErr := DB.AutoMigrate(
		&entity.User{},
		&entity.About{},
		&entity.Contact{},
		&entity.Socmed{},
		&entity.Kejuruan{},
		&entity.Pelatihan{},
		&entity.Peralatan{},
		&entity.Prasarana{},
	); migrateErr != nil {
		panic(migrateErr)
	}
}
