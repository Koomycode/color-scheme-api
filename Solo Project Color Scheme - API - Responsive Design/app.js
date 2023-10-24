const myForm = document.getElementById("form")
const colorInput = document.getElementById("color-input")
const selectInput = document.getElementById("select")
const colorsContainer = document.getElementById("colors")

fetchScheme("000000", "monochrome")


// Get values from the Form and fetch()----------------
myForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const selectedOption = selectInput.options[selectInput.selectedIndex]

    let pickedColor = colorInput.value.slice(1)
    let pickedMode = selectedOption.value

    fetchScheme(pickedColor, pickedMode)
})


// Fetch color schemes and render it -----------------
function fetchScheme(colorHex, colorMode) {
    let colorsArray = []

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${colorMode}`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach(item => {
                colorsArray.push(item.hex.value)
            })

            renderHTML(colorsArray)
        })
}


// Create the HTML for the color scheme fetched --------------
function createHTML(dataArray) {
    return dataArray.map(item => {
        return `
            <div class="color">
                <div class="color-display" data-color="${item}">
                    <h4 class="color-name" data-name="${item}"> ${item} </h4>
                </div>
            </div>
        `
    }).join("")
}


// Render scheme and color the display --------------
function renderHTML(dataArray) {
    colorsContainer.innerHTML = createHTML(dataArray)

    const colorDisplays = document.querySelectorAll(".color-display")
    colorTheDisplay(colorDisplays)
}


// Make color-display background same color ------------
function colorTheDisplay(dataArray) {
    dataArray.forEach(item => {
        const bgColor = item.getAttribute("data-color")
        item.style.background = bgColor
    })
}


// Copy to clipboard --------------------------
document.addEventListener("click", (e) => {
    if (e.target.dataset.color) {
        copyToClipboard(e.target.dataset.color)
    }

    if (e.target.dataset.name) {
        copyToClipboard(e.target.dataset.name)
    }
})

function copyToClipboard(dataText) {
    navigator.clipboard.writeText(dataText)
        .then(() => console.log("Text copied"))
        .catch(err => console.log("Erorr", err))
}