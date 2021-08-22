    document.addEventListener('DOMContentLoaded', () => {
        "use strict";
        (() => {

            let dinos = [];
            
            function readDinosJSONDataFromFile(httpMethod, filePath) {
                const xhr = new XMLHttpRequest(),
                      method = httpMethod ? httpMethod : "GET",
                      url = filePath;
                xhr.onreadystatechange = function() {
                    if (this.readyState ===  XMLHttpRequest.DONE && this.status === 200) {
                        const data = JSON.parse(this.responseText).Dinos;
                        constructDinoObjects(data);
                    }
                };
                xhr.open(method, url);
                xhr.send();
            }

            class Animal {
                
                constructor(species, weight, height, diet, where, when, fact) {
                    this.species = species;
                    this.weight = weight;
                    this.height = height;
                    this.diet = diet;
                    this.where = where;
                    this.when = when;
                    this.fact = fact;
                }
  
            }

            Animal.prototype.getName = function() {
                return this.species;
            }

            function onCompareMeButtonClick() {

                // read inputs
                const nameElement = document.getElementById('name');
                const feetElement = document.getElementById('feet');
                const inchesElement = document.getElementById('inches');
                const weightElement = document.getElementById('weight');
                const dietElement = document.getElementById('diet');
        
                // assign defaults if values are not available
                const name = nameElement ? nameElement.value : "";
                const feet = feetElement ? parseInt(feetElement.value) : 0;
                const inches = inchesElement ? parseInt(inchesElement.value) : 0;
                const weight = weightElement ? parseFloat(weightElement.value) : 0;
                const diet = dietElement ? dietElement.value : "";
                const height = feet * 12 + inches;
                
                setHumanProperties(name, weight, height, diet);

                const gridElement = document.getElementById("grid");
                gridElement.innerHTML = getDinoCardsHtml(); // TODO: set the html content for Dinos here
            }

            function setHumanProperties(name, weight, height, diet) {
                human.name = name;
                human.weight = weight;
                human.height = height;
                human.diet = diet;
            }

            function constructDinoObjects(data) {
                data.forEach(dino => {
                    dinos.push(new Animal(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact));
                });
            }

            function getDinoCardsHtml() {
                let gridHtml = "";

                // write logic here


                return gridHtml;
            }
            
            // read dinos data and construct dino objects
            readDinosJSONDataFromFile('GET', './dino.json');
            
            let human = new Animal("human");

            const compareMeButton = document.getElementById("btn");
            compareMeButton.addEventListener("click", onCompareMeButtonClick);
        })();
    });

    
    
    // Create Dino Constructor
    

    // Create Dino Objects


    // Create Human Object

    // Use IIFE to get human data from form






    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
