package handler

import (
	"net/http"

	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

type ContactHandler struct {
	ContactUsecase usecase.ContactUsecase
}

func NewContactHandler(ac usecase.ContactUsecase) *ContactHandler {
	return &ContactHandler{ContactUsecase: ac}
}

func (ch *ContactHandler) CreateContact(c *gin.Context) {
	var contact entity.Contact
	if err := c.ShouldBindJSON(&contact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create data",
		})
		return
	}

	updated, err := ch.ContactUsecase.CreateContactOrUpdate(&contact)
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

func (ch *ContactHandler) GetContact(c *gin.Context) {
	contact, err := ch.ContactUsecase.GetContact()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "record not found",
		})
		return
	}

	c.JSON(http.StatusOK, contact)
}
