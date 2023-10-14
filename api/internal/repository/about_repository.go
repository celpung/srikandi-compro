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

func (ar *AboutRepository) CrateAbout(about *entity.About) error {
	return ar.DB.Create(&about).Error
}

func (ar *AboutRepository) GetAbout() (*entity.About, error) {
	var about *entity.About
	err := ar.DB.First(&about).Error
	return about, err
}

func (ar *AboutRepository) UpdateAbout(about *entity.About) (*entity.About, error) {
	err := ar.DB.Save(about).Error
	return about, err
}
