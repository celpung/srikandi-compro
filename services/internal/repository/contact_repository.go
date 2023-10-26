package repository

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"gorm.io/gorm"
)

type ContactRepository struct {
	DB *gorm.DB
}

func NewContactRepository(db *gorm.DB) *ContactRepository {
	return &ContactRepository{DB: db}
}

func (cr *ContactRepository) CrateContactORUpdate(contact *entity.Contact) (*entity.Contact, error) {
	var currentContact *entity.Contact

	if err := cr.DB.First(&currentContact).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			if err := cr.DB.Create(contact).Error; err != nil {
				return nil, err
			}
			return contact, nil
		}
		return nil, err
	}

	currentContact.Title = contact.Title
	currentContact.Content = contact.Content

	if err := cr.DB.Save(currentContact).Error; err != nil {
		return nil, err
	}

	return currentContact, nil
}

func (cr *ContactRepository) GetContact() (*entity.Contact, error) {
	var contact *entity.Contact
	err := cr.DB.First(&contact).Error
	return contact, err
}
