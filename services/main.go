package main

import (
	"company_profile_services/configs"
	"company_profile_services/routers"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env", err)
	}

	configs.AutoMigrage()

	gin.SetMode(gin.DebugMode)

	r := gin.Default()

	r.Static("/", "./public")

	api := r.Group("/api")
	routers.Router(api)

	r.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))
}
