package entity

import "gorm.io/gorm"

type Socmed struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	Facebook  string `json:"facebook"`
	Instagram string `json:"instagram"`
	Twitter   string `json:"twitter"`
	gorm.Model
}
