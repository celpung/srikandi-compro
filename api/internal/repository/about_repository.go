package repository

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"gorm.io/gorm"
)

type AboutRepository struct {
	DB *gorm.DB
}

func NewAboutRepository(db *gorm.DB) *AboutRepository {
	return &AboutRepository{DB: db}
}

func (ar *AboutRepository) CrateAboutORUpdate(about *entity.About) (*entity.About, error) {
	var currentAbout *entity.About

	if err := ar.DB.First(&currentAbout).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			if err := ar.DB.Create(about).Error; err != nil {
				return nil, err
			}
			return about, nil
		}
		return nil, err
	}

	currentAbout.Title = about.Title
	currentAbout.Content = about.Content

	if err := ar.DB.Save(currentAbout).Error; err != nil {
		return nil, err
	}

	return currentAbout, nil
}

func (ar *AboutRepository) GetAbout() (*entity.About, error) {
	var about *entity.About
	err := ar.DB.First(&about).Error
	return about, err
}
