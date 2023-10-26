package routers

import (
	"github.com/celpung/srikandi-compro-backend/configs"
	"github.com/celpung/srikandi-compro-backend/internal/handler"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/celpung/srikandi-compro-backend/middlewares"
	"github.com/gin-gonic/gin"
)

func PelatihanRouter(r *gin.Engine) {
	pelatihanRepo := repository.NewPelatihanRepository(configs.DB)
	pelatihanUsecase := usecase.NewPelatihanUseCase(pelatihanRepo)
	pelatihanHandler := handler.NewPelatihanHandler(*pelatihanUsecase)

	pelatihanRouter := r.Group("/pelatihan")
	{
		pelatihanRouter.POST("/create", middlewares.JWTMiddleware(configs.Admin), pelatihanHandler.CreatePelatihan)
		pelatihanRouter.GET("/fetch", pelatihanHandler.GetPelatihan)
		pelatihanRouter.GET("/fetch/:id", pelatihanHandler.GetPelatihanByID)
		pelatihanRouter.PUT("/update/:id", middlewares.JWTMiddleware(configs.Admin), pelatihanHandler.UpdatePelatihan)
		pelatihanRouter.DELETE("/delete/:id", middlewares.JWTMiddleware(configs.Admin), pelatihanHandler.DeletePelatihanByID)
		pelatihanRouter.GET("/count", middlewares.JWTMiddleware(configs.Admin), pelatihanHandler.CountPelatihan)
	}
}
