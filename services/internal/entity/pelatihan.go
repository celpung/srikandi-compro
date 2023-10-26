package entity

import "gorm.io/gorm"

type Pelatihan struct {
	ID         uint        `gorm:"primaryKey" json:"id"`
	Name       string      `gorm:"not null" json:"name" validate:"required"`
	Funding    string      `gorm:"not null" json:"funding" validate:"required"`
	Audience   int32       `gorm:"not null" json:"audience" validate:"required"`
	KejuruanID uint        `gorm:"not null" json:"kejuruan_id"`
	Kejuruan   Kejuruan    `gorm:"foreignKey:KejuruanID" json:"kejuruan"`
	Prasarana  []Prasarana `gorm:"foreignKey:PelatihanID" json:"peralatan" `
	gorm.Model
}
