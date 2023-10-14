package entity

import "time"

type About struct {
	ID        uint       `gorm:"primaryKey" json:"id"`
	Title     string     `gorm:"not null" json:"title" validate:"required"`
	Content   string     `gorm:"not null" json:"content" validate:"required"`
	CreatedAt time.Time  `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time  `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt *time.Time `gorm:"index" json:"deleted_at"`
}
