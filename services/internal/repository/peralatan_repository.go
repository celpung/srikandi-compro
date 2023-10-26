// repository
package repository

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"gorm.io/gorm"
)

type PeralatanRepository struct {
	DB *gorm.DB
}

func NewPeralatanRepository(db *gorm.DB) *PeralatanRepository {
	return &PeralatanRepository{
		DB: db,
	}
}

func (pr *PeralatanRepository) CreatePeralatan(peralatan *entity.Peralatan) (*entity.Peralatan, error) {
	if err := pr.DB.Create(peralatan).Error; err != nil {
		return nil, err
	}
	return peralatan, nil
}

func (pr *PeralatanRepository) GetPeralatan() ([]entity.Peralatan, error) {
	var peralatan []entity.Peralatan
	if err := pr.DB.Preload("Kejuruan").Find(&peralatan).Error; err != nil {
		return nil, err
	}

	return peralatan, nil
}

func (pr *PeralatanRepository) GetPeralatanByID(id uint) (*entity.Peralatan, error) {
	peralatan := &entity.Peralatan{}
	if err := pr.DB.First(peralatan, id).Error; err != nil {
		return nil, err
	}
	return peralatan, nil
}

func (pr *PeralatanRepository) UpdatePeralatan(peralatan *entity.Peralatan, id uint) (*entity.Peralatan, error) {
	var currentPeralatan *entity.Peralatan
	if err := pr.DB.Where("id = ?", id).Find(&currentPeralatan).Error; err != nil {
		return nil, err
	}

	currentPeralatan.Name = peralatan.Name
	currentPeralatan.KejuruanID = peralatan.KejuruanID
	currentPeralatan.Total = peralatan.Total
	currentPeralatan.Image = peralatan.Image

	if err := pr.DB.Save(currentPeralatan).Error; err != nil {
		return nil, err
	}

	return currentPeralatan, nil
}

func (pr *PeralatanRepository) DeletePeralatanByID(id uint) error {
	return pr.DB.Delete(&entity.Peralatan{}, id).Error
}

func (kr *PeralatanRepository) CountPeralatan() (int64, error) {
	var count int64
	if err := kr.DB.Model(&entity.Peralatan{}).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}
