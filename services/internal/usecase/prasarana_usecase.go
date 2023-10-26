package usecase

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
)

type PrasaranaUseCase struct {
	prasaranaRepo *repository.PrasaranaRepository
}

func NewPrasaranaUseCase(repo *repository.PrasaranaRepository) *PrasaranaUseCase {
	return &PrasaranaUseCase{
		prasaranaRepo: repo,
	}
}

func (pc *PrasaranaUseCase) CreatePrasarana(prasarana *entity.Prasarana) (*entity.Prasarana, error) {
	return pc.prasaranaRepo.CreatePrasarana(prasarana)
}

func (pc *PrasaranaUseCase) GetPrasarana() ([]entity.Prasarana, error) {
	return pc.prasaranaRepo.GetPrasana()
}

func (pc *PrasaranaUseCase) GetPrasaranaByID(id uint) (*entity.Prasarana, error) {
	return pc.prasaranaRepo.GetPrasaranaByID(id)
}

func (pc *PrasaranaUseCase) UpdatePrasarana(prasarana *entity.Prasarana, id uint) (*entity.Prasarana, error) {
	return pc.prasaranaRepo.UpdatePrasarana(prasarana, id)
}

func (pc *PrasaranaUseCase) DeletePrasaranaByID(id uint) error {
	return pc.prasaranaRepo.DeletePrasaranaByID(id)
}

func (pc *PrasaranaUseCase) CountPrasarana() (int64, error) {
	return pc.prasaranaRepo.CountPrasarana()
}
