import React, { useState, useEffect, useRef } from "react";

//create your first component
const Home = () => {
  const [lista, setLista] = useState([]);
  const [play, setPlay] = useState(null);
  const [pocisionMusica, setPocisionMusica] = useState();
  const etiquetaAudio = useRef(null);
  console.log(pocisionMusica);

  // fecth
  function getInfo() {
    fetch("https://assets.breatheco.de/apis/sound/songs") //ir a busca
      .then((response) => {
        console.log(response.status);
        return response.json();
      }) //promesa 1
      .then((data) => setLista(data//.alguna propiedad de un objeto... nombre: Herman
      )) //promesa 2
      .catch((err) => console.log(err));
  }
  console.log(lista);

  // Use effect
  useEffect(() => {
    getInfo();
  }, []);
  console.log(lista);

  const setSong = (linkName, i) => {
    console.log("setSong " + linkName + " i " + i);
    etiquetaAudio.current.src = `https://assets.breatheco.de/apis/sound/${linkName}`;
    etiquetaAudio.current.play();
    setPlay(i);
    setPocisionMusica(i);
  };

  const playMusic = () => {
    if (etiquetaAudio !== null) {
      etiquetaAudio.current.play();
    }
  };

  const pauseMusic = () => {
    if (etiquetaAudio !== play) {
      etiquetaAudio.current.pause();
    }
  };

  const nextMusic = () => {
    let posicionAux = 0;
    console.log("nextMusic1" + pocisionMusica);
    if (pocisionMusica < lista.length - 1) {
      setPocisionMusica(pocisionMusica + 1);
      posicionAux = pocisionMusica + 1;
    } else {
      setPocisionMusica(0);
    }
    console.log("nextMusic2" + pocisionMusica);
    etiquetaAudio.current.src = `https://assets.breatheco.de/apis/sound/${lista[posicionAux].url}`;
    etiquetaAudio.current.play();
    console.log(lista[posicionAux].url);
  };

  console.log(pocisionMusica);

  const anteriorMusic = () => {
    let posicionAux = 0;
    if (pocisionMusica > 0) {
      setPocisionMusica(pocisionMusica - 1);
      posicionAux = pocisionMusica - 1;
    } else {
      setPocisionMusica(lista.length - 1);
      posicionAux = lista.length - 1;
    }
    etiquetaAudio.current.src = `https://assets.breatheco.de/apis/sound/${lista[posicionAux].url}`;
    etiquetaAudio.current.play();
    console.log(lista[posicionAux].url);
  };

  return (
    <div className="text-center bg-secondary pt-3">
      <ol>
        {lista.map((item, index) => (
          <li
            key={index}
            className="btn btn-dark d-flex justify-content-start m-3 "
            onClick={() => setSong(item.url, index)}
          >
            {index + " - "}
            {item.name}
          </li>
        ))}
      </ol>
      <div className="container">
        <audio
          controls
          ref={etiquetaAudio}
          src="https://assets.breatheco.de/apis/sound/songs"
          type="audio.mp3"
        />
        <hr />
        <button onClick={anteriorMusic}>
          <i className="fa fa-backward" />
        </button>
        <button onClick={pauseMusic}>
          <i className="fa fa-pause" />
        </button>
        <button onClick={playMusic}>
          <i className="fa fa-play" />
        </button>
        <button onClick={nextMusic}>
          <i className="fa fa-forward" />
        </button>
      </div>
    </div>
  );
};

export default Home;
