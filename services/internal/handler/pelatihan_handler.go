// handler
package handler

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

type PelatihanHandler struct {
	PelatihanUseCase usecase.PelatihanUseCase
}

func NewPelatihanHandler(pc usecase.PelatihanUseCase) *PelatihanHandler {
	return &PelatihanHandler{
		PelatihanUseCase: pc,
	}
}

func (ph *PelatihanHandler) CreatePelatihan(c *gin.Context) {
	var pelatihan entity.Pelatihan
	pelatihan.KejuruanID = uint(pelatihan.KejuruanID)
	if err := c.ShouldBindJSON(&pelatihan); err != nil {
		fmt.Println("error bind : " + err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	createdPelatihan, err := ph.PelatihanUseCase.CreatePelatihan(&pelatihan)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, createdPelatihan)
}

func (ph *PelatihanHandler) GetPelatihan(c *gin.Context) {
	pelatihan, err := ph.PelatihanUseCase.GetPelatihan()
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, pelatihan)
}

func (ph *PelatihanHandler) GetPelatihanByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	pelatihan, err := ph.PelatihanUseCase.GetPelatihanByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pelatihan not found"})
		return
	}

	c.JSON(http.StatusOK, pelatihan)
}

func (ph *PelatihanHandler) UpdatePelatihan(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	var pelatihan entity.Pelatihan
	if err := c.ShouldBindJSON(&pelatihan); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedPelatihan, err := ph.PelatihanUseCase.UpdatePelatihan(&pelatihan, uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedPelatihan)
}

func (ph *PelatihanHandler) DeletePelatihanByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := ph.PelatihanUseCase.DeletePelatihanByID(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}

func (ph *PelatihanHandler) CountPelatihan(c *gin.Context) {
	count, err := ph.PelatihanUseCase.CountPelatihan()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, count)
}
