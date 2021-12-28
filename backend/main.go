package main

import (
	"database/sql"
	"log"
	"os"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func verifyCity(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		city_name := c.Query("name")

		row := db.QueryRow("SELECT * FROM cities WHERE uppercase_name_nomalized LIKE $1", city_name)

		var name string
		var lat float32
		var lng float32
		var state_abbreviation string
		var state_name string
		var population float32
		var is_capital bool
		var id int
		var uppercase_name_nomalized string
		var population_min_max_normalization float32

		err := row.Scan(&name, &lat, &lng, &state_abbreviation, &state_name, &population, &is_capital, &id, &uppercase_name_nomalized, &population_min_max_normalization)

		if err != nil {
			if err == sql.ErrNoRows {
				c.JSON(404, gin.H{
					"message": "Município não existe!",
				})
				return
			} else {
				panic(err)
			}
		}

		c.JSON(200, gin.H{
			"name": name,
			"lat": lat,
			"lng": lng,
			"state_abbreviation": state_abbreviation,
			"state_name": state_name,
			"population": population,
			"is_capital": is_capital,
			"id": id,
			"uppercase_name_nomalized": uppercase_name_nomalized,
			"population_min_max_normalization": population_min_max_normalization,
		})
	}
}

func main() {

	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("./web", true)))

	api := r.Group("/api")

	dbUrl := os.Getenv("DATABASE_URL")

	log.Printf("DB [%s]", dbUrl)

	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))

	if err != nil {
		log.Fatalf("Error opening database: %q", err)
	}

	api.GET("/cities", verifyCity(db))

	r.Run()
}