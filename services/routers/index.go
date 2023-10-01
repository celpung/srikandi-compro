package routers

import (
	"company_profile_services/configs"
	"company_profile_services/controllers/admin"
	"company_profile_services/controllers/user"
	"company_profile_services/middlewares"

	"github.com/gin-gonic/gin"
)

func Router(r *gin.RouterGroup) {
	/*
		user
	*/
	userRouter := r.Group("/user")
	userRouter.POST("/register", func(ctx *gin.Context) {
		user.CreateUser(ctx)
	})
	userRouter.POST("/signin", func(ctx *gin.Context) {
		user.SignIn(ctx)
	})

	/*
		admin
	*/
	adminRouter := r.Group("/admin", middlewares.JWTMiddleware(configs.Admin))
	// web profile router
	webProfileRouter := adminRouter.Group("/web-profile")
	webProfileRouter.POST("/about", func(ctx *gin.Context) {
		admin.UpdateAbout(ctx)
	})
	webProfileRouter.POST("/contact", func(ctx *gin.Context) {
		admin.UpdateContact(ctx)
	})
}
