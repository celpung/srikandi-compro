package handler

import (
	"net/http"
	"strconv"

	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

type KejuruanHandler struct {
	KejuruanUseCase usecase.KejuruanUseCase
}

func NewKejuruanHandler(kc usecase.KejuruanUseCase) *KejuruanHandler {
	return &KejuruanHandler{
		KejuruanUseCase: kc,
	}
}

func (kh *KejuruanHandler) CreateKejuruan(c *gin.Context) {
	var kejuruan entity.Kejuruan
	if err := c.ShouldBindJSON(&kejuruan); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	createdKejuruan, err := kh.KejuruanUseCase.CreateKejuruan(&kejuruan)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, createdKejuruan)
}

func (kh *KejuruanHandler) GetKejuruan(c *gin.Context) {
	kejuruan, err := kh.KejuruanUseCase.GetKejuruan()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, kejuruan)
}

func (kh *KejuruanHandler) GetKejuruanByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	kejuruan, err := kh.KejuruanUseCase.GetKejuruanByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Kejuruan not found"})
		return
	}

	c.JSON(http.StatusOK, kejuruan)
}

func (kh *KejuruanHandler) UpdateKejuruan(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var kejuruan entity.Kejuruan
	if err := c.ShouldBindJSON(&kejuruan); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedKejuruan, err := kh.KejuruanUseCase.UpdateKejuruan(&kejuruan, uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedKejuruan)
}

func (kh *KejuruanHandler) DeleteKejuruanByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := kh.KejuruanUseCase.DeleteKejuruanByID(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}

func (kh *KejuruanHandler) CountKejuruan(c *gin.Context) {
	count, err := kh.KejuruanUseCase.CountKejuruan()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, count)
}
