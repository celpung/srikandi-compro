package usecase

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
)

type AboutUsecase struct {
	AboutRepo *repository.AboutRepository
}

func NewAboutUsecase(repo *repository.AboutRepository) *AboutUsecase {
	return &AboutUsecase{
		AboutRepo: repo,
	}
}

func (ac *AboutUsecase) CreateAboutOrUpdate(about *entity.About) (*entity.About, error) {
	return ac.AboutRepo.CrateAboutORUpdate(about)
}

func (ac *AboutUsecase) GetAbout() (*entity.About, error) {
	return ac.AboutRepo.GetAbout()
}
