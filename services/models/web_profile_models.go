package models

type About struct {
	ID      uint   `gorm:"primaryKey" json:"id"`
	Title   string `gorm:"not null" json:"title" validate:"required"`
	Content string `gorm:"not null" json:"content" validate:"required"`
}

type Contact struct {
	ID      uint   `gorm:"primaryKey" json:"id"`
	Title   string `gorm:"not null" json:"title" validate:"required"`
	Content string `gorm:"not null" json:"content" validate:"required"`
}
