package routers

import (
	"github.com/celpung/srikandi-compro-backend/configs"
	"github.com/celpung/srikandi-compro-backend/internal/handler"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/celpung/srikandi-compro-backend/middlewares"
	"github.com/gin-gonic/gin"
)

func ContactRouter(r *gin.Engine) {
	contactRepo := repository.NewContactRepository(configs.DB)
	contactUseCase := usecase.NewContactUsecase(contactRepo)
	contactHandler := handler.NewContactHandler(*contactUseCase)

	contactRoutes := r.Group("/contact")
	{
		contactRoutes.POST("/", middlewares.JWTMiddleware(configs.Admin), contactHandler.CreateContact)
		contactRoutes.GET("/", contactHandler.GetContact)
	}
}
