// repository
package repository

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"gorm.io/gorm"
)

type PelatihanRepository struct {
	DB *gorm.DB
}

func NewPelatihanRepository(db *gorm.DB) *PelatihanRepository {
	return &PelatihanRepository{
		DB: db,
	}
}

func (pr *PelatihanRepository) CreatePelatihan(pelatihan *entity.Pelatihan) (*entity.Pelatihan, error) {
	if err := pr.DB.Create(pelatihan).Error; err != nil {
		return nil, err
	}
	return pelatihan, nil
}

func (pr *PelatihanRepository) GetPelatihan() ([]entity.Pelatihan, error) {
	var pelatihan []entity.Pelatihan

	if err := pr.DB.Preload("Prasarana").Preload("Kejuruan").Find(&pelatihan).Error; err != nil {
		return nil, err
	}

	return pelatihan, nil
}

func (pr *PelatihanRepository) GetPelatihanByID(id uint) (*entity.Pelatihan, error) {
	pelatihan := &entity.Pelatihan{}
	if err := pr.DB.First(pelatihan, id).Error; err != nil {
		return nil, err
	}
	return pelatihan, nil
}

func (pr *PelatihanRepository) UpdatePelatihan(pelatihan *entity.Pelatihan, id uint) (*entity.Pelatihan, error) {
	var currentPelatihan *entity.Pelatihan
	if err := pr.DB.Where("id = ?", id).Find(&currentPelatihan).Error; err != nil {
		return nil, err
	}

	currentPelatihan.Name = pelatihan.Name
	currentPelatihan.Audience = pelatihan.Audience
	currentPelatihan.Funding = pelatihan.Funding
	currentPelatihan.KejuruanID = pelatihan.KejuruanID

	if err := pr.DB.Save(currentPelatihan).Error; err != nil {
		return nil, err
	}
	return pelatihan, nil
}

func (pr *PelatihanRepository) DeletePelatihanByID(id uint) error {
	return pr.DB.Delete(&entity.Pelatihan{}, id).Error
}

func (kr *PelatihanRepository) CountPelatihan() (int64, error) {
	var count int64
	if err := kr.DB.Model(&entity.Pelatihan{}).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}
