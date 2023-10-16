package usecase

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
)

type SocmedUsecase struct {
	SocmedRepo *repository.SocmedRepository
}

func NewSocmedusecase(repo *repository.SocmedRepository) *SocmedUsecase {
	return &SocmedUsecase{
		SocmedRepo: repo,
	}
}

func (sc *SocmedUsecase) CreateOrUpdateSocmed(socmed *entity.Socmed) (*entity.Socmed, error) {
	return sc.SocmedRepo.CreateOrUpdateSocmed(socmed)
}

func (sc *SocmedUsecase) GetSocmed() (*entity.Socmed, error) {
	return sc.SocmedRepo.GetSocmed()
}
