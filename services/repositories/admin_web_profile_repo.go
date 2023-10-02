package repositories

import (
	"company_profile_services/configs"
	"company_profile_services/models"

	"gorm.io/gorm"
)

/*
update or insert about
*/
func UpsertAbout(about *models.About) (*models.About, error) {
	var existAbout models.About

	if err := configs.DB.First(&existAbout, about.ID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			if err := configs.DB.Create(about).Error; err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	} else {
		if err := configs.DB.Model(&existAbout).Updates(about).Error; err != nil {
			return nil, err
		}
	}

	return about, nil
}

/*
update or insert contact
*/
func UpsertContact(contact *models.Contact) (*models.Contact, error) {
	var existContact models.Contact

	if err := configs.DB.First(&existContact, contact.ID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			if err := configs.DB.Create(contact).Error; err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	} else {
		if err := configs.DB.Model(&existContact).Updates(contact).Error; err != nil {
			return nil, err
		}
	}

	return contact, nil
}

/*
update or insert socmed
*/
func CreateSocmed(data *models.Socmed) (*models.Socmed, error) {
	var existPlatform models.Socmed

	if err := configs.DB.First(&existPlatform, data.Platform).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			if err := configs.DB.Create(&data).Error; err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	} else {
		if err := configs.DB.Model(&existPlatform).Updates(data).Error; err != nil {
			return nil, err
		}
	}
	return data, nil
}
