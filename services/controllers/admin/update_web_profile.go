package admin

import (
	"company_profile_services/models"
	"company_profile_services/repositories"
	"company_profile_services/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

/*
update or insert about
*/
func UpdateAbout(ctx *gin.Context) {
	var about models.About

	if err := ctx.ShouldBindJSON(&about); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid JSON data",
			"error":   err.Error(),
		})
		return
	}

	validate := validator.New()

	if err := validate.Struct(&about); err != nil {
		errors, ok := err.(validator.ValidationErrors)
		if !ok {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "Update failed",
			})
			return
		}

		utils.InputValidator(ctx, &about, errors)
		return
	}

	about.ID = 1

	result, err := repositories.UpsertAbout(&about)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Update failed",
			"error":   err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Update success",
		"data":    result,
	})
}

/*
update or insert contact
*/
func UpdateContact(ctx *gin.Context) {
	var contact models.Contact

	if err := ctx.ShouldBindJSON(&contact); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid JSON data",
			"error":   err.Error(),
		})
		return
	}

	validate := validator.New()

	if err := validate.Struct(&contact); err != nil {
		errors, ok := err.(validator.ValidationErrors)
		if !ok {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "Update failed",
			})
			return
		}

		utils.InputValidator(ctx, &contact, errors)
		return
	}

	contact.ID = 1

	result, err := repositories.UpsertContact(&contact)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Update failed",
			"error":   err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Update success",
		"data":    result,
	})
}
