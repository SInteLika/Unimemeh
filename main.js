const formImage = document.getElementById('formImage')
const formPrev = document.getElementById('formPrev')
const nameOrganization = document.getElementById('nameOrganization')
const emailValidatePopup = document.getElementById('emailValidatePopup')
const selectGroup = document.getElementById('selectGroup')
const selectLabel = document.getElementById('selectLabel')
const telValidatePopup = document.getElementById('telValidatePopup')
const email = document.getElementById('email')
const clearImage = document.querySelector('.form-photo__close')
const popup = document.querySelector('.popup')
const bgBlackout = document.querySelector('.bg-blackout')
const label = document.querySelector('.form-photo__label')
const submit = document.querySelector('.form__submit')
const close = document.querySelector('.form__close')
const openPopup = document.querySelector('.open-popup')
const regexpEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu


formImage.addEventListener('change', () => {
    uploadFIle(formImage.files[0])

})

clearImage.addEventListener('click', () => {
    formImage.value = ''
    formPrev.src = 'image/photo.png'
    label.style.visibility = 'visible'
})

selectGroup.addEventListener('change', (e) => {
    if (e.target.value !== '0') {
        selectLabel.style.marginTop = '-15px'
        selectLabel.style.transition = 'all .2s ease'
    } else {
        selectLabel.style.marginTop = '0'
    }
})

submit.addEventListener('click', (e) => {
    function validate() {
        let isValidate = true

        if (selectGroup.value === '0') {
            isValidate = false
            selectGroup.scrollIntoView()
            selectGroup.classList.add('validate')
            setTimeout(() => {
                selectGroup.classList.remove('validate')
            }, 1000)
        }

        if (email.value.length < 1 || !regexpEmail.test(email.value)) {
            isValidate = false
            email.scrollIntoView()
            email.classList.add('validate')
            emailValidatePopup.classList.add('validate_email')
            setTimeout(() => {
                email.classList.remove('validate')
            }, 1000)
            setTimeout(() => {
                emailValidatePopup.classList.remove('validate_email')
            }, 3000)
        }

        if (tel.value.length < 1 || (tel.value[0] === '8' && tel.value.length < 15)
            || (["7", "9"].indexOf(tel.value[1]) > -1) && tel.value.length < 16 ) {
            isValidate = false
            tel.scrollIntoView()
            tel.classList.add('validate')
            telValidatePopup.classList.add('validate_tel')
            setTimeout(() => {
                tel.classList.remove('validate')
            }, 1000)
            setTimeout(() => {
                telValidatePopup.classList.remove('validate_tel')
            }, 3000)
        }

        if (nameOrganization.value.length < 1) {
            isValidate = false
            nameOrganization.scrollIntoView()
            nameOrganization.classList.add('validate')
            setTimeout(() => {
                nameOrganization.classList.remove('validate')
            }, 1000)
        }


        if (formImage.value.length < 1) {
            isValidate = false
            nameOrganization.scrollIntoView()
            const photo = document.querySelector('.form-photo__img')
            photo.classList.add('validate')
            setTimeout(() => {
                photo.classList.remove('validate')
            }, 1000)
        }
        return isValidate
    }
    if(validate()){
        popup.style.display = 'none'
        bgBlackout.style.display = 'none'
    }
})

close.addEventListener('click', (e) => {
    popup.style.display = 'none'
    bgBlackout.style.display = 'none'
})

openPopup.addEventListener('click', (e) => {
    popup.style.display = 'flex'
    bgBlackout.style.display = 'block'
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
})

function uploadFIle(file) {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Разрешены только изображения')
        formImage.value = ''
        return;
    }
    let reader = new FileReader()
    reader.onload = function (e) {
        formPrev.src = e.target.result
        label.style.visibility = 'hidden'

    }
    reader.onerror = function (e) {
        alert('Произошла ошибка во время загрузки файла')
    }
    reader.readAsDataURL(file)
}
