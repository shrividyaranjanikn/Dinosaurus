    document.addEventListener('DOMContentLoaded', () => {
        "use strict";
        (() => {

            let dinos = [];

            class Animal {
                
                constructor(species, weight, height, diet, where, when, fact) {
                    this.species = species;
                    this.weight = weight;
                    this.height = height;
                    this.diet = diet;
                    this.where = where;
                    this.when = when;
                    this.fact = fact;
                    this.facts = [fact];
                }
  
            }

            Animal.prototype.getName = function() {
                return this.species;
            }

            Animal.prototype.getCardHtml = function() {

                const dinoTitle = `<h3>${this.species === "human" ? this.name : this.species}</h3>`;  
                const dinoImage = `<img src="${this.getDinoImagePath()}" alt="${this.species}'s image">`;
                const dinoFact = `<p>${this.species === "human" ? '' : this.getRandomDinoFact()}</p>`;

                return `<div class="grid-item">${dinoTitle}${dinoImage}${dinoFact}</div>`;
            }

            Animal.prototype.getDinoImagePath = function() {
                return `./images/${this.species.toLowerCase()}.png`;
            };

            Animal.prototype.compareWeight = function() {
                const differenceInWeight = this.weight - human.weight;
                const weightComparisonToHuman = `The ${this.species} is ${Math.abs(differenceInWeight)} inches ${differenceInWeight > 0 ? 'taller' : 'shorter'} than ${human.name}.`;
                return weightComparisonToHuman;
            }

            Animal.prototype.compareHeight = function () {
                const differenceInHeight = this.height - human.height;
                const heightComparisonToHuman = `The ${this.species} is ${Math.abs(differenceInHeight)} inches ${differenceInHeight > 0 ? 'taller' : 'shorter'} than ${human.name}.`;
                return heightComparisonToHuman;
            };

            Animal.prototype.compareDiet = function() {
                const dietComparisonToHuman = `${this.diet === human.diet 
                    ? `${this.species} and ${human.name} are ${this.diet}.` 
                    : `${this.species}'s diet is ${this.diet} where as ${human.name}'s diet is ${human.diet}`}`;
                return dietComparisonToHuman;
            }

            Animal.prototype.compareLivingPeriod = function() {
                const livingPeriodComparison = `The ${this.species} lived during ${this.when} period whereas ${human.name} lived during ${human.when} period.`;
                return livingPeriodComparison;
            }

            Animal.prototype.getRandomDinoFact = function() {
                const randomIndex = Math.floor(Math.random() * this.facts.length);
                return this.facts[randomIndex];
            }

            Animal.prototype.setRandomFacts = function () {
                if (this.species !== "Pigeon") {
                  this.facts.push(`The ${this.species} lived here: ${this.where}`);
                  this.facts.push(this.compareHeight(), this.compareWeight(), this.compareDiet(), this.compareLivingPeriod());
                }
            };

            function readDinosJSONDataFromFile(httpMethod, filePath) {
                const xhr = new XMLHttpRequest(),
                      method = httpMethod ? httpMethod : "GET",
                      url = filePath;
                xhr.onreadystatechange = function() {
                    if (this.readyState ===  XMLHttpRequest.DONE && this.status === 200) {
                        const data = JSON.parse(this.responseText).Dinos;
                        constructDinoObjects(data);
                        randomlyOrderDinoObjects();
                    }
                };
                xhr.open(method, url);
                xhr.send();
            }

            function randomlyOrderDinoObjects () {
                const pigeon = dinos.pop();
          
                for (let index = dinos.length - 1; index > 0; index--) {
                  const randomIndex = Math.floor(Math.random() * (index + 1));
                  [dinos[index], dinos[randomIndex]] = [dinos[randomIndex], dinos[index]];
                }
          
                // place pigeon object at the end of the grid
                dinos.push(pigeon);
                // place human object in the middle
                dinos.splice(4, 0, human);
            }

            function onCompareMeButtonClick() {

                // hide form
                document.getElementById('dino-compare').className = 'hide';

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
                const diet = dietElement ? dietElement.value.toLowerCase() : "";
                const height = feet * 12 + inches;
                
                setHumanProperties(name, weight, height, diet);

                const gridElement = document.getElementById("grid");
                gridElement.innerHTML = getGridHtml(); // TODO: set the html content for Dinos here
            }

            function setHumanProperties(name, weight, height, diet) {
                human.name = name;
                human.weight = weight;
                human.height = height;
                human.diet = diet;
                human.when = 'Palaeoproterozoic';
                human.where = 'Africa';
                human.fact = 'Humans evolved from Apes!';
                human.facts = [human.fact];
            }

            function constructDinoObjects(data) {
                data.forEach(dino => {
                    // construct and push Animal objects into dinos array
                    dinos.push(new Animal(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact));
                });
            }
            
            function getGridHtml() {
                let html = "";
                dinos.forEach(dino => {
                    dino.setRandomFacts();
                    html += dino.getCardHtml();
                });
                return html;
            }
            
            // read dinos data and construct dino objects
            readDinosJSONDataFromFile('GET', './dino.json');
            
            let human = new Animal("human");

            const compareMeButton = document.getElementById("btn");
            compareMeButton.addEventListener("click", onCompareMeButtonClick);
        })();
    });
