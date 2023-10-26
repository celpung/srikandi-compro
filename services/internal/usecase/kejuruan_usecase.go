package usecase

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
)

type KejuruanUseCase struct {
	kejuruanRepo *repository.KejuruanRepository
}

func NewKejuruanUseCase(repo *repository.KejuruanRepository) *KejuruanUseCase {
	return &KejuruanUseCase{
		kejuruanRepo: repo,
	}
}

func (kc *KejuruanUseCase) CreateKejuruan(kejuruan *entity.Kejuruan) (*entity.Kejuruan, error) {
	return kc.kejuruanRepo.CreateKejuruan(kejuruan)
}

func (kc *KejuruanUseCase) GetKejuruan() ([]entity.Kejuruan, error) {
	return kc.kejuruanRepo.GetKejuruan()
}

func (kc *KejuruanUseCase) GetKejuruanByID(id uint) (*entity.Kejuruan, error) {
	return kc.kejuruanRepo.GetKejuruanByID(id)
}

func (kc *KejuruanUseCase) UpdateKejuruan(kejuruan *entity.Kejuruan, id uint) (*entity.Kejuruan, error) {
	return kc.kejuruanRepo.UpdateKejuruan(kejuruan, id)
}

func (kc *KejuruanUseCase) DeleteKejuruanByID(id uint) error {
	return kc.kejuruanRepo.DeleteKejuruanByID(id)
}

func (kc *KejuruanUseCase) CountKejuruan() (int64, error) {
	return kc.kejuruanRepo.CountKejuruan()
}
