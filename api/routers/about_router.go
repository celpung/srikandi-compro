package routers

import (
	"github.com/celpung/srikandi-compro-backend/configs"
	"github.com/celpung/srikandi-compro-backend/internal/handler"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/celpung/srikandi-compro-backend/middlewares"
	"github.com/gin-gonic/gin"
)

func AboutRouter(r *gin.Engine) {
	aboutRepo := repository.NewAboutRepository(configs.DB)
	aboutUseCase := usecase.NewAboutUsecase(aboutRepo)
	aboutHandler := handler.NewAboutHandler(*aboutUseCase)

	aboutRoutes := r.Group("/about")
	{
		aboutRoutes.POST("/", middlewares.JWTMiddleware(configs.Admin), aboutHandler.CreateAbout)
		aboutRoutes.GET("/", aboutHandler.GetAbout)
	}
}
