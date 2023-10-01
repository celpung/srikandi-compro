package repositories

import (
	"company_profile_services/configs"
	"company_profile_services/models"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

/*
create user
*/
func CreateUser(user *models.User) error {

	hashedPassword, hashErr := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if hashErr != nil {
		return hashErr
	}

	user.Password = string(hashedPassword)

	result := configs.DB.Create(&user)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

/*
sign in
*/
func SignIn(login *models.UserLogin) (*models.User, error) {
	var user models.User

	res := configs.DB.Where("email = ?", login.Email).Find(&user)
	if res.Error != nil {
		return nil, errors.New("authentication failed")
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(login.Password))
	if err != nil {
		return nil, errors.New("incorrect password")
	}

	return &user, nil
}
