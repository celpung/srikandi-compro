// usecase
package usecase

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
)

type PeralatanUseCase struct {
	peralatanRepo *repository.PeralatanRepository
}

func NewPeralatanUseCase(repo *repository.PeralatanRepository) *PeralatanUseCase {
	return &PeralatanUseCase{
		peralatanRepo: repo,
	}
}

func (pc *PeralatanUseCase) CreatePeralatan(peralatan *entity.Peralatan) (*entity.Peralatan, error) {
	return pc.peralatanRepo.CreatePeralatan(peralatan)
}

func (pc *PeralatanUseCase) GetPeralatan() ([]entity.Peralatan, error) {
	return pc.peralatanRepo.GetPeralatan()
}

func (pc *PeralatanUseCase) GetPeralatanByID(id uint) (*entity.Peralatan, error) {
	return pc.peralatanRepo.GetPeralatanByID(id)
}

func (pc *PeralatanUseCase) UpdatePeralatan(peralatan *entity.Peralatan, id uint) (*entity.Peralatan, error) {
	return pc.peralatanRepo.UpdatePeralatan(peralatan, id)
}

func (pc *PeralatanUseCase) DeletePeralatanByID(id uint) error {
	return pc.peralatanRepo.DeletePeralatanByID(id)
}

func (pc *PeralatanUseCase) CountPeralatan() (int64, error) {
	return pc.peralatanRepo.CountPeralatan()
}
