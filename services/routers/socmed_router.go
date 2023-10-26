package routers

import (
	"github.com/celpung/srikandi-compro-backend/configs"
	"github.com/celpung/srikandi-compro-backend/internal/handler"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/celpung/srikandi-compro-backend/middlewares"
	"github.com/gin-gonic/gin"
)

func SocmedRouter(r *gin.Engine) {
	socmedRepo := repository.NewSocmedRepository(configs.DB)
	socmedUsecase := usecase.NewSocmedusecase(socmedRepo)
	socmedHandler := handler.NewSocmedHandler(*socmedUsecase)

	socmedRouter := r.Group("/socmed")
	{
		socmedRouter.POST("/create", middlewares.JWTMiddleware(configs.Admin), socmedHandler.CreateOrUpdateSocmed)
		socmedRouter.GET("/fetch", socmedHandler.GetSocmed)
	}
}
