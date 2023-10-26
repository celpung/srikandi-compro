package routers

import (
	"github.com/celpung/srikandi-compro-backend/configs"
	"github.com/celpung/srikandi-compro-backend/internal/handler"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/celpung/srikandi-compro-backend/middlewares"
	"github.com/gin-gonic/gin"
)

func KejuruanRouter(r *gin.Engine) {
	kejuruanRepo := repository.NewKejuruanRepository(configs.DB)
	kejuruanUsecase := usecase.NewKejuruanUseCase(kejuruanRepo)
	kejuruanHandler := handler.NewKejuruanHandler(*kejuruanUsecase)

	kejuruanRouter := r.Group("/kejuruan")
	{
		kejuruanRouter.POST("/create", middlewares.JWTMiddleware(configs.Admin), kejuruanHandler.CreateKejuruan)
		kejuruanRouter.GET("/fetch", kejuruanHandler.GetKejuruan)
		kejuruanRouter.GET("/fetch/:id", kejuruanHandler.GetKejuruanByID)
		kejuruanRouter.PUT("/update/:id", middlewares.JWTMiddleware(configs.Admin), kejuruanHandler.UpdateKejuruan)
		kejuruanRouter.DELETE("/delete/:id", middlewares.JWTMiddleware(configs.Admin), kejuruanHandler.DeleteKejuruanByID)
		kejuruanRouter.GET("/count", middlewares.JWTMiddleware(configs.Admin), kejuruanHandler.CountKejuruan)
	}
}
