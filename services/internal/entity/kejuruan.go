package entity

import "gorm.io/gorm"

type Kejuruan struct {
	ID        uint        `gorm:"primaryKey" json:"id"`
	Name      string      `gorm:"not null" json:"name" validate:"required"`
	Pelatihan []Pelatihan `gorm:"foreignKey:KejuruanID" json:"pelatihan"`
	Peralatan []Peralatan `gorm:"foreignKey:KejuruanID" json:"peralatan"`
	Prasarana []Prasarana `gorm:"foreignKey:KejuruanID" json:"prasarana"`
	gorm.Model
}
