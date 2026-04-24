import { useState } from 'react';
import styles from './Projetos.module.css';
import type { Projeto } from '../../types';
import closeIcon from '../../assets/img/close.svg';

interface ProjetosProps {
  projetos: Projeto[];
}

export default function Projetos({ projetos }: ProjetosProps) {
  const [projetoAtivo, setProjetoAtivo] = useState<Projeto | null>(null);
  const [imagemAtiva, setImagemAtiva] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (id: number): void => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  const openModal = (projeto: Projeto) => {
    setProjetoAtivo(projeto);
    setImagemAtiva(0);
  };

  const closeModal = () => setProjetoAtivo(null);

  const prevImage = () => {
    if (!projetoAtivo) return;
    setImagemAtiva(prev => (prev === 0 ? projetoAtivo.imagens.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (!projetoAtivo) return;
    setImagemAtiva(prev => (prev === projetoAtivo.imagens.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section className={`${styles.projetos} container`}>
        <h2 className={`${styles.projetos__titulo} tituloH2`}>Projetos</h2>
        <section className={styles.projetos__container}>
          {projetos.map(projeto => (
            <article 
              key={projeto.id} 
              className={styles.projeto} 
              onClick={() => openModal(projeto)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`${styles.imgWrapper} ${!loadedImages.has(projeto.id) ? styles.skeleton : ''}`}>
                <img 
                  className={styles.projeto__img} 
                  src={projeto.imagem} 
                  alt={`Projeto em ${projeto.localidade}`} 
                  loading="lazy"
                  onLoad={() => handleImageLoad(projeto.id)}
                />
              </div>
              <p className={styles.projeto__tipo}>{projeto.nome}</p>
              <h3 className={`${styles.projeto__localidade} tituloH3`}>{projeto.localidade}</h3>
            </article>
          ))}
        </section>
      </section>

      {projetoAtivo && (
        <div className={styles['modalProjetos-container']} role="dialog" aria-modal="true" aria-label="Galeria de imagens do projeto">
          <div className={styles.modalProjetos}>
            <button className={styles['seta-esquerda']} onClick={prevImage} aria-label="Imagem anterior">
              <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M41 12L22.5 30.5L41 49" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className={styles.fecharModalProjetos} onClick={closeModal} aria-label="Fechar galeria">
              <img src={closeIcon.src} alt="fechar modal" />
            </button>
            <div className={styles.modalProjetos__imagem}>
              <img src={projetoAtivo.imagens[imagemAtiva]} alt="Imagem do projeto" />
            </div>
            <button className={styles['seta-direita']} onClick={nextImage} aria-label="Próxima imagem">
              <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                <path d="M41 12L22.5 30.5L41 49" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
