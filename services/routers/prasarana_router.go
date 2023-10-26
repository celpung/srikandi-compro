package routers

import (
	"github.com/celpung/srikandi-compro-backend/configs"
	"github.com/celpung/srikandi-compro-backend/internal/handler"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/celpung/srikandi-compro-backend/middlewares"
	"github.com/gin-gonic/gin"
)

func PrasaranaRouter(r *gin.Engine) {
	prasaranaRepo := repository.NewPrasaranaRepository(configs.DB)
	prasaranaUsecase := usecase.NewPrasaranaUseCase(prasaranaRepo)
	prasaranaHandler := handler.NewPrasaranaHandler(*prasaranaUsecase)

	prasaranaRouter := r.Group("/prasarana")
	{
		prasaranaRouter.POST("/create", middlewares.JWTMiddleware(configs.Admin), prasaranaHandler.CreatePrasarana)
		prasaranaRouter.GET("/fetch", prasaranaHandler.GetPrasarana)
		prasaranaRouter.GET("/fetch/:id", prasaranaHandler.GetPrasaranaByID)
		prasaranaRouter.PUT("/update/:id", middlewares.JWTMiddleware(configs.Admin), prasaranaHandler.UpdatePrasarana)
		prasaranaRouter.DELETE("/delete/:id", middlewares.JWTMiddleware(configs.Admin), prasaranaHandler.DeletePrasaranaByID)
		prasaranaRouter.GET("/count", middlewares.JWTMiddleware(configs.Admin), prasaranaHandler.CountPrasarana)
	}
}
