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

type PrasaranaHandler struct {
	PrasaranaUseCase usecase.PrasaranaUseCase
}

func NewPrasaranaHandler(pc usecase.PrasaranaUseCase) *PrasaranaHandler {
	return &PrasaranaHandler{
		PrasaranaUseCase: pc,
	}
}

func (ph *PrasaranaHandler) CreatePrasarana(c *gin.Context) {
	//get post form data
	name := c.PostForm("name")
	totalStr := c.PostForm("total")
	wideStr := c.PostForm("wide")
	capacityStr := c.PostForm("capacity")
	pelatihan_id_str := c.PostForm("pelatihan_id")
	kejuruan_id_str := c.PostForm("kejuruan_id")

	// parsing the data
	total, err := strconv.ParseInt(totalStr, 10, 32)
	if err != nil {
		fmt.Println(err, " 1")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	wide, err := strconv.ParseInt(wideStr, 10, 32)
	if err != nil {
		fmt.Println(err, " 2")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	capacity, err := strconv.ParseInt(capacityStr, 10, 32)
	if err != nil {
		fmt.Println(err, " 3")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	pelatihan_id, err := strconv.ParseUint(pelatihan_id_str, 10, 32)
	if err != nil {
		fmt.Println(err, " 4")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	kejuruan_id, err := strconv.ParseUint(kejuruan_id_str, 10, 32)
	if err != nil {
		fmt.Println(err, " 5")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// upload image
	uploadedFile, err := goupload.Single(c.Request, "../public/images", "image")
	if err != nil {
		fmt.Println(err, " 6")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	uploadedUrl := strings.Replace(uploadedFile.Filename, "..", "", 1)

	var prasarana entity.Prasarana

	if err := c.ShouldBind(&prasarana); err != nil {
		fmt.Println(err, " 7")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	prasarana.Name = name
	prasarana.Total = int32(total)
	prasarana.Wide = int32(wide)
	prasarana.Capacity = int32(capacity)
	prasarana.PelatihanID = uint(pelatihan_id)
	prasarana.KejuruanID = uint(kejuruan_id)
	prasarana.Image = uploadedUrl

	data, err := ph.PrasaranaUseCase.CreatePrasarana(&prasarana)
	if err != nil {
		fmt.Println(err, " 8")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, data)
}

func (ph *PrasaranaHandler) GetPrasarana(c *gin.Context) {
	prasarana, err := ph.PrasaranaUseCase.GetPrasarana()
	if err != nil {
		fmt.Println(err, " 9")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	c.JSON(http.StatusOK, prasarana)
}

func (ph *PrasaranaHandler) GetPrasaranaByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	prasarana, err := ph.PrasaranaUseCase.GetPrasaranaByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Prasarana not found"})
		return
	}

	c.JSON(http.StatusOK, prasarana)
}

func (ph *PrasaranaHandler) UpdatePrasarana(c *gin.Context) {
	var prasarana entity.Prasarana
	//get post form data
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	name := c.PostForm("name")
	totalStr := c.PostForm("total")
	wideStr := c.PostForm("wide")
	capacityStr := c.PostForm("capacity")
	pelatihan_id_str := c.PostForm("pelatihan_id")
	kejuruan_id_str := c.PostForm("kejuruan_id")

	// parsing the data
	total, err := strconv.ParseInt(totalStr, 10, 32)
	if err != nil {
		fmt.Println(err, " 1")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	wide, err := strconv.ParseInt(wideStr, 10, 32)
	if err != nil {
		fmt.Println(err, " 2")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	capacity, err := strconv.ParseInt(capacityStr, 10, 32)
	if err != nil {
		fmt.Println(err, " 3")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	pelatihan_id, err := strconv.ParseUint(pelatihan_id_str, 10, 32)
	if err != nil {
		fmt.Println(err, " 4")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	kejuruan_id, err := strconv.ParseUint(kejuruan_id_str, 10, 32)
	if err != nil {
		fmt.Println(err, " 5")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = c.FormFile("image")
	if err == nil {
		// An image is provided, update the image URL
		uploadedFile, err := goupload.Single(c.Request, "../public/images", "image")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		uploadedUrl := strings.Replace(uploadedFile.Filename, "..", "", 1)

		prasarana.Image = uploadedUrl
	}

	prasarana.Name = name
	prasarana.Total = int32(total)
	prasarana.Wide = int32(wide)
	prasarana.Capacity = int32(capacity)
	prasarana.PelatihanID = uint(pelatihan_id)
	prasarana.KejuruanID = uint(kejuruan_id)

	data, err := ph.PrasaranaUseCase.UpdatePrasarana(&prasarana, uint(id))
	if err != nil {
		fmt.Println(err, " 8")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, data)

}

func (ph *PrasaranaHandler) DeletePrasaranaByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := ph.PrasaranaUseCase.DeletePrasaranaByID(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}

func (ph *PrasaranaHandler) CountPrasarana(c *gin.Context) {
	count, err := ph.PrasaranaUseCase.CountPrasarana()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, count)
}
