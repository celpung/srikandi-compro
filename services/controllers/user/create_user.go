package user

import (
	"company_profile_services/models"
	"company_profile_services/repositories"
	"company_profile_services/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func CreateUser(ctx *gin.Context) {
	var user models.User

	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid JSON data",
			"error":   err.Error(),
		})
		return
	}

	validate := validator.New()

	if err := validate.Struct(&user); err != nil {
		errors, ok := err.(validator.ValidationErrors)
		if !ok {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "Internal server error",
			})
			return
		}

		utils.InputValidator(ctx, &user, errors)
		return
	}

	if err := repositories.CreateUser(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Register failed",
			"error":   err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "User created successfully",
	})
}
