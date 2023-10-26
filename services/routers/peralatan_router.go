package routers

import (
	"github.com/celpung/srikandi-compro-backend/configs"
	"github.com/celpung/srikandi-compro-backend/internal/handler"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/celpung/srikandi-compro-backend/middlewares"
	"github.com/gin-gonic/gin"
)

func PeralatanRouter(r *gin.Engine) {
	peralatanRepo := repository.NewPeralatanRepository(configs.DB)
	peralatanUsecase := usecase.NewPeralatanUseCase(peralatanRepo)
	peralatanHandler := handler.NewPeralatanHandler(*peralatanUsecase)

	peralatanRouter := r.Group("/peralatan")
	{
		peralatanRouter.POST("/create", middlewares.JWTMiddleware(configs.Admin), peralatanHandler.CreatePeralatan)
		peralatanRouter.GET("/fetch", peralatanHandler.GetPeralatan)
		peralatanRouter.GET("/fetch/:id", peralatanHandler.GetPeralatanByID)
		peralatanRouter.PUT("/update/:id", middlewares.JWTMiddleware(configs.Admin), peralatanHandler.UpdatePeralatan)
		peralatanRouter.DELETE("/delete/:id", middlewares.JWTMiddleware(configs.Admin), peralatanHandler.DeletePeralatanByID)
		peralatanRouter.GET("/count", middlewares.JWTMiddleware(configs.Admin), peralatanHandler.CountPeralatan)
	}
}
