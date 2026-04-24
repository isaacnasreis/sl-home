import { useState, useEffect } from 'react';
import styles from './Depoimentos.module.css';
import type { Depoimento } from '../../types';
import starsIcon from '../../assets/img/stars.svg';

interface DepoimentosSliderProps {
  depoimentos: Depoimento[];
}

export default function DepoimentosSlider({ depoimentos }: DepoimentosSliderProps) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);

  useEffect(() => {
    if (depoimentos.length === 0) return;
    const interval = setInterval(() => {
      setIndiceAtivo(prev => (prev === depoimentos.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [depoimentos]);

  const prev = () => {
    setIndiceAtivo(p => (p === 0 ? depoimentos.length - 1 : p - 1));
  };

  const next = () => {
    setIndiceAtivo(p => (p === depoimentos.length - 1 ? 0 : p + 1));
  };

  if (depoimentos.length === 0) return null;

  return (
    <section className={`${styles.depoimentos} container`}>
      <h2 className={`${styles.depoimentos__titulo} tituloH2`}>Cliente e depoimentos</h2>
      <div className={styles.depoimentos__container}>
        <button className={styles['seta-esquerda']} onClick={prev} aria-label="Depoimento anterior">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41 12L22.5 30.5L41 49" stroke="#212969" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        
        <div key={indiceAtivo} className={styles.depoimento} aria-live="polite" aria-atomic="true">
          <blockquote className={styles.depoimento__texto}>"{depoimentos[indiceAtivo].mensagem}"</blockquote>
          <img src={starsIcon.src} alt="Ícones de cinco estrelas" className={styles.depoimento__estrelas} />
          <p className={styles.depoimento__autor}>{depoimentos[indiceAtivo].nome}</p>
        </div>

        <button className={styles['seta-direita']} onClick={next} aria-label="Próximo depoimento">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
            <path d="M41 12L22.5 30.5L41 49" stroke="#212969" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
