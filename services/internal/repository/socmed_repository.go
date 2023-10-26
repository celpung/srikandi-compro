package repository

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"gorm.io/gorm"
)

type SocmedRepository struct {
	DB *gorm.DB
}

func NewSocmedRepository(db *gorm.DB) *SocmedRepository {
	return &SocmedRepository{DB: db}
}

func (sr *SocmedRepository) CreateOrUpdateSocmed(socmed *entity.Socmed) (*entity.Socmed, error) {
	var currentSocmed *entity.Socmed

	if err := sr.DB.First(&currentSocmed).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			if err := sr.DB.Create(socmed).Error; err != nil {
				return nil, err
			}
			return socmed, nil
		}
		return nil, err
	}

	currentSocmed.Facebook = socmed.Facebook
	currentSocmed.Instagram = socmed.Instagram
	currentSocmed.Twitter = socmed.Twitter

	if err := sr.DB.Save(currentSocmed).Error; err != nil {
		return nil, err
	}

	return currentSocmed, nil
}

func (cr *SocmedRepository) GetSocmed() (*entity.Socmed, error) {
	var socmed *entity.Socmed
	err := cr.DB.First(&socmed).Error
	return socmed, err
}
