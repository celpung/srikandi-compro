// usecase
package usecase

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
)

type PelatihanUseCase struct {
	pelatihanRepo *repository.PelatihanRepository
}

func NewPelatihanUseCase(repo *repository.PelatihanRepository) *PelatihanUseCase {
	return &PelatihanUseCase{
		pelatihanRepo: repo,
	}
}

func (pc *PelatihanUseCase) CreatePelatihan(pelatihan *entity.Pelatihan) (*entity.Pelatihan, error) {
	return pc.pelatihanRepo.CreatePelatihan(pelatihan)
}

func (pc *PelatihanUseCase) GetPelatihan() ([]entity.Pelatihan, error) {
	return pc.pelatihanRepo.GetPelatihan()
}

func (pc *PelatihanUseCase) GetPelatihanByID(id uint) (*entity.Pelatihan, error) {
	return pc.pelatihanRepo.GetPelatihanByID(id)
}

func (pc *PelatihanUseCase) UpdatePelatihan(pelatihan *entity.Pelatihan, id uint) (*entity.Pelatihan, error) {
	return pc.pelatihanRepo.UpdatePelatihan(pelatihan, id)
}

func (pc *PelatihanUseCase) DeletePelatihanByID(id uint) error {
	return pc.pelatihanRepo.DeletePelatihanByID(id)
}

func (pc *PelatihanUseCase) CountPelatihan() (int64, error) {
	return pc.pelatihanRepo.CountPelatihan()
}
