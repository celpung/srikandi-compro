package entity

import (
	"gorm.io/gorm"
)

type Contact struct {
	ID      uint   `gorm:"primaryKey" json:"id"`
	Title   string `gorm:"not null" json:"title" validate:"required"`
	Content string `gorm:"not null" json:"content" validate:"required"`
	gorm.Model
}
