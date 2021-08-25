// Nav
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", hamburgerMenu)


function hamburgerMenu() {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
}

// Miniräknaren
const clear = document.querySelector(".clear")
const del = document.querySelector(".delete")
const percent = document.querySelector(".percent")
const numbers = document.querySelectorAll(".number")
const comma = document.querySelector(".comma")
const operators = document.querySelectorAll(".operator")
const display = document.querySelector(".calc-display")
const previousDisplay = document.querySelector(".previous-display")
const equals = document.querySelector(".equals")

class Calculator {
    constructor(currentDisplay, previousDisplay) {
        this.currentDisplay = currentDisplay
        this.previousDisplay = previousDisplay
        this.clear()
    }

    clear() {
        this.current = 0
        this.previous = ''
        this.operator = undefined
        this.valueToSave = ''
    }

    delete() {
        this.current = this.current.toString().slice(0, -1)
    }

    percent() {
        // Om man trycker % efter att ha tryckt = så nollställs det sparade
        if (this.valueToSave != '' || this.operator != undefined)
        {
            this.current = parseFloat(this.previous) / 100
            calculator.updateDisplay()
            this.previous = this.current
            this.current = ''
            this.valueToSave = ''
        } else {
            this.current = parseFloat(this.current) / 100
            calculator.updateDisplay()
        }
    }

    addNumber(number) {
        // resets valueToSave om man börjar lägga till nya siffror
        if (this.valueToSave != '') {
            this.clear()
        }

        // Om det första man trycker är , ska 0:an sparas
        if (this.current === 0 && number != '.') this.current = ''

        // Det går inte att skriva större tal än 100-tals miljoner atm
        if (this.current.length >= 9) return

        this.current = this.current.toString() + number.toString()
        this.updateDisplay()
    }

    addOperator(operator) {
        // Det ska inte gå att ange operator om man inte först angett en siffra
        if (this.current == 0 || this.current == '') return
        
        // Om man tryckt på = så nollställs det sparade
        if (this.valueToSave != '') {
            this.current = this.previous
            this.previous = ''
            this.valueToSave = ''
        }
        
        // Om man anger en operator istället för = utförs uträkningen ändå
        if (this.previous != '') {
            this.calculate()
        }

        this.operator = operator
        this.previous = this.current
        this.current = ''
    }

    equals() {
        // current sparas i valueToSave ifall man fortsätter trycka =
        this.valueToSave = this.current
        this.calculate()
        this.previous = this.current
        this.current = this.valueToSave
    }

    calculate() {
        let calc
        const prev = parseFloat(this.previous)
        const curr = parseFloat(this.current)
        switch (this.operator) {
            case '+':
                calc = prev + curr
                break
            case '-':
                calc = prev - curr
                break
            case '×':
                calc = prev * curr
                break
            case '÷':
                calc = prev / curr
                break
            default:
                return
        }

        this.current = calc
        this.updateDisplay()
    }

    getDisplayNumbers(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.'))
        const decimalDigits = stringNumber.split('.')[1]
        let displayNumbers
        if (isNaN(integerDigits)) {
            displayNumbers = 0
        } else {
            displayNumbers = integerDigits.toLocaleString("sv", {maximumFractionDigits: 0})
        }

        if (decimalDigits != null) {
            return `${displayNumbers},${decimalDigits}`
        } else {
            return displayNumbers
        }
    }

    updateDisplay() {
        this.currentDisplay.innerHTML = this.getDisplayNumbers(this.current)
    }
}


const calculator = new Calculator(display)
let operatorCtr = 0

clear.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
    operatorCtr = 0
})

del.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})

percent.addEventListener("click", () => {
    calculator.percent()
})

numbers.forEach(number => number.addEventListener("click", () => {
    calculator.addNumber(number.innerHTML)
    operators.forEach(operator => operator.classList.remove("chosen"))
    operatorCtr = 0
}))

comma.addEventListener("click", () => {
    calculator.addNumber('.')
    calculator.updateDisplay()
})

operators.forEach(operator => operator.addEventListener("click", () => {
    calculator.addOperator(operator.innerHTML)
    if (operatorCtr < 1 && calculator.previous != '') {
        operator.classList.add("chosen")
        operatorCtr++
    }
}))

equals.addEventListener("click", () => {
    calculator.equals()
    operators.forEach(operator => operator.classList.remove("chosen"))
    operatorCtr = 0
})

// Väderappen
const weatherIconDiv = document.querySelector(".weather-icon")
const weatherTemperature = document.querySelector(".weather-temperature p")
const weatherDescription = document.querySelector(".weather-description p")
const weatherLocation = document.querySelector(".weather-location p")
const weatherNotification = document.querySelector("weather-notification") 

const weather = {}
weather.temperature = {}

const KELVIN = 273
const apiKey = "d0ddcde2cb4705f0886de5a8d08c5456"

// Hämtar nuvarande position
// if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(setPosition)
// }

// Tar ut kordinaterna som vi skickar till apiet
// function setPosition(position) {
//     let latitude = position.coords.latitude
//     let longitude = position.coords.longitude
//     getWeather(latitude, longitude)
// }

// Hämtar apiet from openweathermap.org
// function getWeather(latitude, longitude) {
//     let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
//     console.log(api);

//     fetch(api).then(function(response) {
//         let data = response.json()
//         return data
//     }).then(function(data) {
//         weather.temperature.value = Math.floor(data.main.temp - KELVIN)
//         weather.description = data.weather[0].description
//         weather.icon = data.weather[0].icon
//         weather.city = data.name
//         weather.country = data.sys.country
//     }).then(function() {
//         displayWeather()
//     })
// }

// Visar vädret till skärmen
// function displayWeather() {
//     weatherIconDiv.innerHTML = `<img src="img/weather-icons/${weather.icon}.png">`
//     weatherTemperature.innerHTML = `${weather.temperature.value}°<span>C</span>`
//     weatherDescription.innerHTML = weather.description
//     weatherLocation.innerHTML = `${weather.city}, ${weather.country}`
// }

weatherIconDiv.innerHTML = `<img src="img/weather-icons/50d.png">`
weatherTemperature.innerHTML = `15°<span>C</span>`
weatherDescription.innerHTML = "broken clouds"
weatherLocation.innerHTML = `Norrtälje Kommun, SE`

