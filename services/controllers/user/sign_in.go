package user

import (
	"company_profile_services/models"
	"company_profile_services/repositories"
	"company_profile_services/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func SignIn(ctx *gin.Context) {
	var login models.UserLogin

	if err := ctx.ShouldBindJSON(&login); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Login failed",
			"error":   err.Error(),
		})
		return
	}

	validate := validator.New()
	err := validate.Struct(&login)
	if err != nil {
		errors, ok := err.(validator.ValidationErrors)
		if !ok {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"success": false,
				"message": "Internal server error",
			})
			return
		}

		utils.InputValidator(ctx, &login, errors)
		return
	}

	user, err := repositories.SignIn(&login)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Login Failed",
			"error":   err.Error(),
		})
		return
	}

	token, err := utils.JWTGenerator(*user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Login Failed",
			"error":   err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Login Success",
		"token":   token,
	})

}
