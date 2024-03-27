const dropArea = document.getElementById('drop-area')
const input = document.getElementById('upload-file')

function toggleClass(elementId, removeClass, addClass) {
	const element = document.getElementById(elementId)
	if (element) {
		element.classList.remove(removeClass)
		element.classList.add(addClass)
	}
}
//дроп - синий драг - серый

toggleClass('drag', 'none-active', 'active')
toggleClass('drop', 'active', 'non-active')
toggleClass('dropped', 'active', 'non-active')

const dropZone = document.getElementById('dropZone')

// Предотвращение стандартного поведения браузера при перетаскивании файлов
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
	dropZone.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e) {
	e.preventDefault()
}

dropZone.addEventListener('dragenter', highlight, false)

dropZone.addEventListener('dragleave', unhighlight, false)

dropZone.addEventListener('drop', dropHandler, false)

function highlight(e) {
	toggleClass('drop', 'non-active', 'active')
	toggleClass('drag', 'active', 'non-active')
	toggleClass('upload-file-container', 'active', 'non-active')
}

function unhighlight(e) {
	toggleClass('drop', 'active', 'non-active')
	toggleClass('drag', 'non-active', 'active')
	toggleClass('upload-file-container', 'non-active', 'active')
}
function dropHandler(e) {
	toggleClass('drop', 'active', 'non-active')
	toggleClass('drag', 'active', 'non-active')
	toggleClass('dropped', 'non-active', 'active')

	setTimeout(reset, 3000)
}
function reset() {
	toggleClass('drag', 'none-active', 'active')
	toggleClass('drop', 'active', 'non-active')
	toggleClass('dropped', 'active', 'non-active')
	toggleClass('upload-file-container', 'non-active', 'active')
}

// Обработка события drop
dropZone.addEventListener('drop', handleDrop, false)
input.addEventListener('change', () => inputHandler())

function inputHandler(input) {
	let file = document.getElementById('upload-file').files[0]
	let reader = new FileReader()

	if (input !== undefined) {
		reader.readAsDataURL(input)
	} else {
		reader.readAsDataURL(file)
	}

	reader.onload = function () {
		let img = document.createElement('img')
		document.getElementById('file-preview').appendChild(img)
		img.src = reader.result
	}
}
function handleDrop(e) {
	let dt = e.dataTransfer
	let files = dt.files

	handleFiles(files)
}

function handleFiles(files) {
	;[...files].forEach(uploadFile)
}

function uploadFile(file) {
	inputHandler(file)

	// Здесь можно добавить код для дальнейшей обработки файла
}
