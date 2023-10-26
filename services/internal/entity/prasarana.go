package entity

import "gorm.io/gorm"

type Prasarana struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"not null" json:"name" validate:"required"`
	Total       int32     `gorm:"not null" json:"total" validate:"required"`
	Wide        int32     `gorm:"not null" json:"wide" validate:"required"`
	Capacity    int32     `gorm:"not null" json:"capacity" validate:"required"`
	PelatihanID uint      `gorm:"not null" json:"pelatihan_id"`
	Pelatihan   Pelatihan `gorm:"foreignKey:PelatihanID" json:"pelatihan"`
	KejuruanID  uint      `gorm:"not null" json:"kejuruan_id"`
	Kejuruan    Kejuruan  `gorm:"foreignKey:KejuruanID" json:"kejuruan"`
	Image       string    `gorm:"not null" json:"image"`
	gorm.Model
}
