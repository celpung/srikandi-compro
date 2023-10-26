package main

import (
	"fmt"
	"log"
	"os"

	"github.com/celpung/srikandi-compro-backend/configs"
	"github.com/celpung/srikandi-compro-backend/routers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// load .env
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env", err)
	}

	// Connect to the database
	configs.ConnectDatabase()
	configs.AutoMigrage()

	// setup gin
	r := gin.Default()

	// setup cors
	corsConfig := cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length", "Authorization"},
		AllowCredentials: true,
	})

	r.Use(corsConfig)

	// import all routers
	routers.UserRouter(r)
	routers.AboutRouter(r)
	routers.ContactRouter(r)
	routers.SocmedRouter(r)
	routers.KejuruanRouter(r)
	routers.PelatihanRouter(r)
	routers.PeralatanRouter(r)
	routers.PrasaranaRouter(r)

	publicPath := "/public"
	publicDir := "../public"

	r.Static(publicPath, publicDir)

	// Start the server
	r.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))
}
