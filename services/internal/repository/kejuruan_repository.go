package repository

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"gorm.io/gorm"
)

type KejuruanRepository struct {
	DB *gorm.DB
}

func NewKejuruanRepository(db *gorm.DB) *KejuruanRepository {
	return &KejuruanRepository{
		DB: db,
	}
}

func (kr *KejuruanRepository) CreateKejuruan(kejuruan *entity.Kejuruan) (*entity.Kejuruan, error) {
	if err := kr.DB.Create(kejuruan).Error; err != nil {
		return nil, err
	}
	return kejuruan, nil
}

func (kr *KejuruanRepository) GetKejuruan() ([]entity.Kejuruan, error) {
	var kejuruan []entity.Kejuruan

	if err := kr.DB.Preload("Pelatihan").Preload("Peralatan").Find(&kejuruan).Error; err != nil {
		return nil, err
	}

	return kejuruan, nil
}

func (kr *KejuruanRepository) GetKejuruanByID(id uint) (*entity.Kejuruan, error) {
	kejuruan := &entity.Kejuruan{}
	if err := kr.DB.First(kejuruan, id).Error; err != nil {
		return nil, err
	}
	return kejuruan, nil
}

func (kr *KejuruanRepository) UpdateKejuruan(kejuruan *entity.Kejuruan, id uint) (*entity.Kejuruan, error) {
	var currentData *entity.Kejuruan
	if err := kr.DB.Where("id = ?", id).Find(&currentData).Error; err != nil {
		return nil, err
	}

	currentData.Name = kejuruan.Name

	if err := kr.DB.Save(currentData).Error; err != nil {
		return nil, err
	}

	return kejuruan, nil
}

func (kr *KejuruanRepository) DeleteKejuruanByID(id uint) error {
	return kr.DB.Delete(&entity.Kejuruan{}, id).Error
}

func (kr *KejuruanRepository) CountKejuruan() (int64, error) {
	var count int64
	if err := kr.DB.Model(&entity.Kejuruan{}).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}
