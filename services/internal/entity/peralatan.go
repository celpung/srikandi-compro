package entity

import "gorm.io/gorm"

type Peralatan struct {
	ID         uint     `gorm:"primaryKey" json:"id"`
	Name       string   `gorm:"not null" json:"name" validate:"required"`
	Total      int32    `gorm:"not null" json:"total" validate:"required"`
	KejuruanID uint     `gorm:"not null" json:"kejuruan_id"`
	Kejuruan   Kejuruan `gorm:"foreignKey:KejuruanID" json:"kejuruan"`
	Image      string   `gorm:"not null" json:"image"`
	gorm.Model
}
