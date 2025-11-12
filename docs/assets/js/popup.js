const main = document.getElementById('main');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupDate = document.getElementById('popup-date');
const popupContentDescription = document.getElementById('popup-content-description');
const closePopupBtn = document.getElementById('close-popup-btn');
const linkBtn = document.getElementById('link-btn');

function showPopup(item) {
    if (item.description){
        popupContentDescription.innerText = item.description;
        popupTitle.innerText = item.title || 'Announcement';
        if (item.date){
            popupDate.innerHTML = `<i class="bi bi-calendar2-event-fill"></i>&nbsp;&nbsp;${formatDate(item.date)}`;
            popupDate.style.display = 'block';
        }
        else{
            popupDate.style.display = 'none';
        }
        if (item.link) {
            linkBtn.href = item.link;
            linkBtn.style.display = 'block';
        }
        else{
            linkBtn.style.display = 'none';
        }
        main.classList.add('disabled');
        popup.style.display = 'flex';
    }
    else{
        confirm("There is no description yet");
    }
}

closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    main.classList.remove('disabled');
})