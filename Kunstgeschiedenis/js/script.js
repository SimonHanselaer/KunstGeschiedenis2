{
  let artworks;
  let array = [];

  const showCorrectAnswer = () => {
    const $h2 = document.querySelector(`h2`);
    const $p = document.querySelector(`p`);

    $h2.classList.remove(`hidden`);
    $p.classList.remove(`hidden`);
  }

  const showAnswer = () => {
    const $answer = document.querySelector(`.answer`);

    $answer.addEventListener(`click`,showCorrectAnswer);
  }

  const handleSubmitEvent = e => {
    const $form = e.target;

    const $errorArtiest = document.querySelector(`.errorArtiest`);
    const $errorStroming = document.querySelector(`.errorStroming`);

    const $kunstenaar = document.querySelector(`.kunstenaar`).value.toUpperCase();
    const $stroming = document.querySelector(`.stroming`).value.toUpperCase();
    const $antwKunstenaar = document.querySelector(`h2`).textContent.toUpperCase();
    const $antwStroming = document.querySelector(`p`).textContent.toUpperCase();

    if ($kunstenaar != $antwKunstenaar || $stroming != $antwStroming) {
      e.preventDefault();
      if ($kunstenaar != $antwKunstenaar) {
        $errorArtiest.textContent = "Foute kunstenaar";
      }
      if ($stroming != $antwStroming) {
        $errorStroming.textContent = "Foute stroming";
      }
      if ($kunstenaar == $antwKunstenaar) {
        $errorArtiest.textContent = "";
      }
      if ($stroming == $antwStroming) {
        $errorStroming.textContent = "";
      }
    } else {
      generateRandom();
    }
  }

  const valideerForm = () => {
    const $form = document.querySelector(`form`);
    $form.noValidate = true;

    $form.addEventListener(`submit`,handleSubmitEvent);
  }

  const generateRandom = () => {
    const random = Math.round(Math.random() * artworks.length);
    artworks.forEach(artwork => {
      if (random == artwork.id && array.includes(artwork.id) == false) {
        showWork(artwork);
      }
    })
  }

  const handleClickEvent = () => {
    const $section = document.querySelector(`section`);

    $section.innerHTML = ``;

    generateRandom();
  }

  const nextArtwork = () => {
    const $button = document.querySelector(`.button`);

    $button.addEventListener(`click`,handleClickEvent);
  }

  const showWork = artwork => {
    const $section = document.querySelector(`section`);

    const $div = document.createElement(`div`);
    const $divImage = document.createElement(`div`);
    const $img = document.createElement(`img`);
    const $h2 = document.createElement(`h2`);
    const $p = document.createElement(`p`);

    $divImage.classList.add(`imageClass`);
    $h2.classList.add(`hidden`);
    $p.classList.add(`hidden`);
    $img.src = artwork.image;
    $img.setAttribute(`height`, `70%`);
    $img.setAttribute(`width`, `70%`);
    $h2.textContent = artwork.Artiest;
    $p.textContent = artwork.Kunststroming;

    $section.appendChild($div);
    $div.appendChild($divImage);
    $divImage.appendChild($img);
    $div.appendChild($h2);
    $div.appendChild($p);

    array.push(artwork.id);
  }

  const showData = data => {
    artworks = data;
    generateRandom();

  }

  const fetchData = () => {
    const url = `./assets/data/data.json`;

    fetch(url)
    .then(r => r.json())
    .then(jsonData => showData(jsonData));
  }

  const init = () => {
    fetchData();
    nextArtwork();
    valideerForm();
    showAnswer();
  }

  init();
}
