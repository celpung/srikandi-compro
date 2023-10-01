package models

import (
	"gorm.io/gorm"
)

type User struct {
	ID             uint   `gorm:"primaryKey" json:"id"`
	Name           string `gorm:"not null" json:"name" validate:"required"`
	Email          string `gorm:"unique" json:"email" validate:"required,email"`
	Phone          string `gorm:"unique" json:"phone" validate:"required,omitempty,numeric,min=10,max=13"`
	Password       string `json:"password" validate:"omitempty,min=8,max=15"`
	Role           uint   `gorm:"not null;default:1" json:"role"`
	Active         bool   `gorm:"not null;default:1" json:"active"`
	EmailConfirmed bool   `gorm:"not null;default:1" json:"email_confirmed"`
	gorm.Model
}

type UserLogin struct {
	Email    string `gorm:"unique" json:"email" validate:"required,email"`
	Password string `json:"password" validate:"omitempty,min=8,max=15"`
}
