package handler

import (
	"net/http"

	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

type SocmedHandler struct {
	SocmedUsecase usecase.SocmedUsecase
}

func NewSocmedHandler(sc usecase.SocmedUsecase) *SocmedHandler {
	return &SocmedHandler{SocmedUsecase: sc}
}

func (sh *SocmedHandler) CreateOrUpdateSocmed(c *gin.Context) {
	var socmed entity.Socmed
	if err := c.ShouldBindJSON(&socmed); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create data",
		})
		return
	}

	res, err := sh.SocmedUsecase.CreateOrUpdateSocmed(&socmed)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create data",
		})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (sh *SocmedHandler) GetSocmed(c *gin.Context) {
	contact, err := sh.SocmedUsecase.GetSocmed()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "record not found",
		})
		return
	}

	c.JSON(http.StatusOK, contact)
}
