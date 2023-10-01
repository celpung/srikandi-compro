package utils

import (
	"fmt"
	"net/http"
	"reflect"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func InputValidator(ctx *gin.Context, model interface{}, errors validator.ValidationErrors) {
	errorList := make(map[string]string)

	structType := reflect.TypeOf(model).Elem()

	for _, e := range errors {
		var errMsg string
		field, _ := structType.FieldByName(e.StructField())
		fieldName := field.Tag.Get("json")
		switch e.Tag() {
		case "required":
			errMsg = fmt.Sprintf("%s tidak boleh kosong", fieldName)
		case "unique":
			errMsg = fmt.Sprintf("%s sudah ada", fieldName)
		case "numeric":
			errMsg = fmt.Sprintf("%s harus berupa angka", fieldName)
		case "min":
			errMsg = fmt.Sprintf("%s karakter terlalu pendek", fieldName)
		case "max":
			errMsg = fmt.Sprintf("%s karakter terlalu panjang", fieldName)
		case "phone":
			errMsg = fmt.Sprintf("%s tidak valid", fieldName)
		case "email":
			errMsg = fmt.Sprintf("%s tidak valid", fieldName)
		}
		errorList[fieldName] = errMsg
	}

	ctx.JSON(http.StatusBadRequest, gin.H{
		"success": false,
		"message": "Register failed",
		"error":   errorList,
	})
}
