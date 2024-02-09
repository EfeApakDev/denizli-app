import React, { useState, useEffect } from 'react';
import { Link } from 'next/link';

const App = () => {
  const [dovizKuru, setDovizKuru] = useState('');
  const [saat, setSaat] = useState('');
  const [haberler, setHaberler] = useState([]);

  useEffect(() => {
    // Doviz kurunu API'den al
    fetch('https://api.exchangerate-api.com/v4/latest/TRY')
      .then((response) => response.json())
      .then((data) => setDovizKuru(data.rates.USD));

    // Saati al
    setInterval(() => {
      const now = new Date();
      setSaat(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
    }, 1000);

    // Denizli'den son dakika haberlerini al
    fetch('https://www.haberturk.com/yerel-haberler/denizli-haberleri')
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newsItems = doc.querySelectorAll('.news-item');
        setHaberler(Array.from(newsItems).map((item) => item.textContent));
      });
  }, []);

  return (
    <div>
      <div className="header">
        <div className="kayanyaziband">
          <span>{dovizKuru}</span>
          <span>{saat}</span>
          {haberler.map((haber) => (
            <span key={haber}>{haber}</span>
          ))}
        </div>
        <h1>Denizli App</h1>
      </div>
      <div className="main">
        <p>Denizli App ile şehrinizin nabzını tutun!</p>
        <ul>
          <li>Hava durumu</li>
          <li>Etkinlikler</li>
          <li>Toplu taşıma</li>
          <li>Daha fazlası...</li>
        </ul>
        <div className="indirmebaglantilari">
          <Link href="https://play.google.com/store/apps/details?id=com.denizliapp">
            <a>Google Play</a>
          </Link>
          <Link href="https://apps.apple.com/tr/app/denizli-app/id1543212345">
            <a>App Store</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
