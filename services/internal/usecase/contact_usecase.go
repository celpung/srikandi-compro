package usecase

import (
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
)

type ContactUsecase struct {
	ContactRepo *repository.ContactRepository
}

func NewContactUsecase(repo *repository.ContactRepository) *ContactUsecase {
	return &ContactUsecase{
		ContactRepo: repo,
	}
}

func (cc *ContactUsecase) CreateContactOrUpdate(contact *entity.Contact) (*entity.Contact, error) {
	return cc.ContactRepo.CrateContactORUpdate(contact)
}

func (cc *ContactUsecase) GetContact() (*entity.Contact, error) {
	return cc.ContactRepo.GetContact()
}
