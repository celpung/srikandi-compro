package handler

import (
	"net/http"

	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

type AboutHandler struct {
	AboutUsecase usecase.AboutUsecase
}

func NewAboutHandler(ac usecase.AboutUsecase) *AboutHandler {
	return &AboutHandler{AboutUsecase: ac}
}

func (ah *AboutHandler) CreateAbout(c *gin.Context) {
	var about entity.About
	if err := c.ShouldBindJSON(&about); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create data",
		})
		return
	}

	updated, err := ah.AboutUsecase.CreateAboutOrUpdate(&about)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create data",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Data created",
		"data":    updated,
	})
}

func (ah *AboutHandler) GetAbout(c *gin.Context) {
	about, err := ah.AboutUsecase.GetAbout()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "record not found",
		})
	}

	c.JSON(http.StatusOK, about)
}
