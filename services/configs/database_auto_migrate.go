package configs

import (
	"company_profile_services/models"
)

func AutoMigrage() {
	ConnectDatabase()

	if migrateErr := DB.AutoMigrate(
		&models.User{}, &models.About{}, &models.Contact{},
	); migrateErr != nil {
		panic(migrateErr)
	}
}
