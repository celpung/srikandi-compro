// handler
package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	goupload "github.com/celpung/go-upload"
	"github.com/celpung/srikandi-compro-backend/internal/entity"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

type PeralatanHandler struct {
	PeralatanUseCase usecase.PeralatanUseCase
}

func NewPeralatanHandler(pc usecase.PeralatanUseCase) *PeralatanHandler {
	return &PeralatanHandler{
		PeralatanUseCase: pc,
	}
}

func (ph *PeralatanHandler) CreatePeralatan(c *gin.Context) {

	name := c.PostForm("name")
	totalStr := c.PostForm("total")
	kejuruan_idStr := c.PostForm("kejuruan_id")

	total, err := strconv.ParseInt(totalStr, 10, 32)
	if err != nil {
		fmt.Println(err, " 1")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	uploadedFile, err := goupload.Single(c.Request, "../public/images", "image")
	if err != nil {
		fmt.Println(err, " 6")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	uploadedUrl := strings.Replace(uploadedFile.Filename, "..", "", 1)

	kejuruan_id, err := strconv.ParseUint(kejuruan_idStr, 10, 32)
	if err != nil {
		fmt.Println(err, " 1")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var peralatan entity.Peralatan

	if err := c.ShouldBind(&peralatan); err != nil {
		fmt.Println(err, " 7")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	peralatan.Name = name
	peralatan.Total = int32(total)
	peralatan.KejuruanID = uint(kejuruan_id)
	peralatan.Image = uploadedUrl

	createdPeralatan, err := ph.PeralatanUseCase.CreatePeralatan(&peralatan)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, createdPeralatan)
}

func (ph *PeralatanHandler) GetPeralatan(c *gin.Context) {
	peralatan, err := ph.PeralatanUseCase.GetPeralatan()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, peralatan)
}

func (ph *PeralatanHandler) GetPeralatanByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	peralatan, err := ph.PeralatanUseCase.GetPeralatanByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Peralatan not found"})
		return
	}

	c.JSON(http.StatusOK, peralatan)
}

func (ph *PeralatanHandler) UpdatePeralatan(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	name := c.PostForm("name")
	totalStr := c.PostForm("total")
	kejuruan_idStr := c.PostForm("kejuruan_id")
	kejuruan_id, err := strconv.ParseUint(kejuruan_idStr, 10, 32)
	if err != nil {
		fmt.Println(err, " 1")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	total, err := strconv.ParseInt(totalStr, 10, 32)
	if err != nil {
		fmt.Println(err, " 1")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var peralatan entity.Peralatan
	_, err = c.FormFile("image")
	if err == nil {
		// An image is provided, update the image URL
		uploadedFile, err := goupload.Single(c.Request, "../public/images", "image")
		if err != nil {
			fmt.Println(err, " image error")
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		uploadedUrl := strings.Replace(uploadedFile.Filename, "..", "", 1)

		peralatan.Image = uploadedUrl
	}

	peralatan.Name = name
	peralatan.Total = int32(total)
	peralatan.KejuruanID = uint(kejuruan_id)

	if err := c.ShouldBind(&peralatan); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedPeralatan, err := ph.PeralatanUseCase.UpdatePeralatan(&peralatan, uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedPeralatan)
}

func (ph *PeralatanHandler) DeletePeralatanByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := ph.PeralatanUseCase.DeletePeralatanByID(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}

func (ph *PeralatanHandler) CountPeralatan(c *gin.Context) {
	count, err := ph.PeralatanUseCase.CountPeralatan()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, count)
}
