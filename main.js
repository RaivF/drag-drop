const dropArea = document.getElementById('drop-area')
const input = document.getElementById('upload-file')
const dropper = document.getElementById('dropper')

function toggleClass(elementId, removeClass, addClass) {
	const element = document.getElementById(elementId)
	if (element) {
		element.classList.remove(removeClass)
		element.classList.add(addClass)
	}
}

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
let arrFiles = []
let container = document.getElementById('file-info-main-container')

function inputHandler(input) {
	let file = document.getElementById('upload-file').files[0]
	let reader = new FileReader()
	let fileName
	let fileSize
	let extension
	let id

	if (input !== undefined) {
		reader.readAsDataURL(input)
		extension = input.type.split('/')[1]
		fileName = input.name.split('.')[0]
		fileSize = (input.size / 10000000).toFixed(2)
	} else {
		reader.readAsDataURL(file)
		extension = file.type.split('/')[1]
		fileName = file.name.split('.')[0]
		fileSize = (file.size / 10000000).toFixed(2)
	}
	reader.onload = function () {
		let fileURL = reader.result
		id = fileURL
		updateArr(fileURL)
		mapper(container, arrFiles)
	}

	function updateArr(fileURL) {
		arrFiles.push({
			fileName: `${fileName}`,
			fileSize: `${fileSize}мб`,
			url: `${fileURL}`,
			extension: `${extension}`,
			id: `${id}`,
		})
	}
}
function mapper(container, arr) {
	const fragment = document.createDocumentFragment() // Создаем фрагмент

	arr.forEach(item => {
		// Создаем контейнер для каждого файла
		const fileContainer = document.createElement('div')
		fileContainer.classList.add('file-info-container')
		let extensions =
			item.extension.split('.')[item.extension.split('.').length - 1]
		if (item.extension == undefined) {
			extensions = 'file'
		}
		// Заполняем контейнер содержимым
		fileContainer.innerHTML = `
            <div class="file-preview" id="file-preview">
                <img class="file-preview-img" id="file-preview-img" src=${item.url} alt="" />
                <div class="file-info">
											<div class="name-and-extension">
                    	  <span class="file-name">${item.fileName}</span>

											  <span>.${extensions}</span>
											</div>
                    <span class="file-size">${item.fileSize}</span>
                </div>
            </div>
            <div class="procent-and-close" id="procent-and-close" >
                <div class="procent" id="procent">100%</div>
                <div class="close" id="close">
									<img class='status' src="./free-icon-check-mark-4225683.png" alt="">
									<img class='cancel' src="./free-icon-close-cross-in-circular-outlined-interface-button-58253.png" alt="">
								</div>
            </div>`

		// Добавляем контейнер в фрагмент
		fragment.appendChild(fileContainer)
	})

	// Очищаем содержимое контейнера и добавляем все элементы одновременно
	container.innerHTML = ''
	container.appendChild(fragment)
}

dropper.addEventListener('click', i => clickHandler(i))
function clickHandler(i) {
	if (i.target.className === 'cancel') {
		let currentID =
			i.target.parentElement.parentElement.parentElement.firstElementChild
				.firstElementChild.src
		arrFiles = arrFiles.filter(i => {
			return i.id !== currentID
		})
		mapper(container, arrFiles)
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
