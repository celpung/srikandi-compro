package repository

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"gorm.io/gorm"
)

type PrasaranaRepository struct {
	DB *gorm.DB
}

func NewPrasaranaRepository(db *gorm.DB) *PrasaranaRepository {
	return &PrasaranaRepository{
		DB: db,
	}
}

func (pr *PrasaranaRepository) CreatePrasarana(prasarana *entity.Prasarana) (*entity.Prasarana, error) {
	if err := pr.DB.Create(prasarana).Error; err != nil {
		return nil, err
	}
	return prasarana, nil
}

func (pr *PrasaranaRepository) GetPrasana() ([]entity.Prasarana, error) {
	var prasarana []entity.Prasarana
	if err := pr.DB.Preload("Pelatihan").Preload("Kejuruan").Find(&prasarana).Error; err != nil {
		return nil, err
	}

	return prasarana, nil
}

func (pr *PrasaranaRepository) GetPrasaranaByID(id uint) (*entity.Prasarana, error) {
	prasarana := &entity.Prasarana{}
	if err := pr.DB.First(prasarana, id).Error; err != nil {
		return nil, err
	}
	return prasarana, nil
}

func (pr *PrasaranaRepository) UpdatePrasarana(prasarana *entity.Prasarana, id uint) (*entity.Prasarana, error) {
	var currentPrasarana *entity.Prasarana
	if err := pr.DB.Where("id = ?", id).Find(&currentPrasarana).Error; err != nil {
		return nil, err
	}

	currentPrasarana.Name = prasarana.Name
	currentPrasarana.Total = prasarana.Total
	currentPrasarana.Wide = prasarana.Wide
	currentPrasarana.Capacity = prasarana.Capacity
	currentPrasarana.PelatihanID = prasarana.PelatihanID
	currentPrasarana.KejuruanID = prasarana.KejuruanID
	currentPrasarana.Image = prasarana.Image

	if err := pr.DB.Save(currentPrasarana).Error; err != nil {
		return nil, err
	}
	return currentPrasarana, nil
}

func (pr *PrasaranaRepository) DeletePrasaranaByID(id uint) error {
	return pr.DB.Delete(&entity.Prasarana{}, id).Error
}

func (pr *PrasaranaRepository) CountPrasarana() (int64, error) {
	var count int64
	if err := pr.DB.Model(&entity.Prasarana{}).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}
