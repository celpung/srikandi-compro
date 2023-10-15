package routers

import (
	"github.com/celpung/srikandi-compro-backend/configs"
	"github.com/celpung/srikandi-compro-backend/infrastructure"
	"github.com/celpung/srikandi-compro-backend/internal/handler"
	"github.com/celpung/srikandi-compro-backend/internal/repository"
	"github.com/celpung/srikandi-compro-backend/internal/usecase"
	"github.com/celpung/srikandi-compro-backend/middlewares"
	"github.com/gin-gonic/gin"
)

func UserRouter(r *gin.Engine) {
	passwordSrv := infrastructure.NewPasswordService()
	jwtSrv := infrastructure.NewJwtService()

	userRepo := repository.NewUserRepository(configs.DB)
	userUseCase := usecase.NewUserUseCase(userRepo, passwordSrv, jwtSrv)
	userHandler := handler.NewUserHandler(*userUseCase)

	userRoutes := r.Group("/users")
	{
		userRoutes.POST("/", userHandler.CreateUser)
		userRoutes.POST("/sign-in", userHandler.SignIn)
		userRoutes.GET("/", middlewares.JWTMiddleware(configs.Admin), userHandler.GetAllUser)
		userRoutes.GET("/:id", middlewares.JWTMiddleware(configs.User), userHandler.GetUserByID)
		userRoutes.PUT("/:id", middlewares.JWTMiddleware(configs.User), userHandler.UpdateUser)
		userRoutes.DELETE("/:id", middlewares.JWTMiddleware(configs.Admin), userHandler.DeleteUser)
	}
}
