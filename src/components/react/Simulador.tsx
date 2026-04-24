import { useState, useMemo } from 'react';
import styles from './Simulador.module.css';
import closeIcon from '../../assets/img/close.svg';
import energySunIcon from '../../assets/img/energySun.svg';
import { FaseInstalacao, CUSTO_POR_FASE, FATOR_DISPONIBILIDADE } from '../../types';
import type { SimuladorResultado } from '../../types';

/** Formata um número como moeda brasileira (R$) */
const formatCurrency = (value: number): string =>
  value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

export default function Simulador() {
  const [valorPago, setValorPago] = useState(0);
  const [taxaIluminacao, setTaxaIluminacao] = useState(0);
  const [faseInstalacao, setFaseInstalacao] = useState<FaseInstalacao>(FaseInstalacao.Monofasico);
  const [nome, setNome] = useState('');
  const [showModal, setShowModal] = useState(false);

  const resultado: SimuladorResultado = useMemo(() => {
    const valorFase = CUSTO_POR_FASE[faseInstalacao] * FATOR_DISPONIBILIDADE;
    const novoValorFatura = taxaIluminacao + valorFase;
    const economiaMensal = valorPago - novoValorFatura;
    const economiaAnual = economiaMensal * 12;
    return { novoValorFatura, economiaMensal, economiaAnual };
  }, [valorPago, taxaIluminacao, faseInstalacao]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <section className={styles.simulador} id="simulador">
        <h2 className={`${styles.simulador__titulo} tituloH2`}>Simulador</h2>
        <p className={styles.simulador__descricao}>
          Simule agora para saber quanto você pode economizar utilizando a energia solar
        </p>
        <form className={styles.simulador__form} onSubmit={handleSubmit}>

          <div className={styles.simulador__inputGroup}>
            <div className={styles.simulador__inputHeader}>
              <label htmlFor="valorPago" className={styles.simulador__label}>Valor pago atualmente:</label>
              <span className={styles.simulador__valueDisplay}>{formatCurrency(valorPago)}</span>
            </div>
            <input
              className={styles.simulador__range}
              id="valorPago"
              name="valorPago"
              type="range"
              min="0"
              max="3999"
              step="0.01"
              value={valorPago}
              onChange={(e) => setValorPago(parseFloat(e.target.value))}
            />
          </div>

          <div className={styles.simulador__input}>
            <legend className={styles.simulador__label}>Fase da instalação:</legend>
            <div className={styles.simulador__radio}>
              <div>
                <input
                  type="radio"
                  name="faseInstalacao"
                  id="monofasico"
                  value={FaseInstalacao.Monofasico}
                  checked={faseInstalacao === FaseInstalacao.Monofasico}
                  onChange={() => setFaseInstalacao(FaseInstalacao.Monofasico)}
                />
                <label htmlFor="monofasico">Monofásico</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="faseInstalacao"
                  id="bifasico"
                  value={FaseInstalacao.Bifasico}
                  checked={faseInstalacao === FaseInstalacao.Bifasico}
                  onChange={() => setFaseInstalacao(FaseInstalacao.Bifasico)}
                />
                <label htmlFor="bifasico">Bifásico</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="faseInstalacao"
                  id="trifasico"
                  value={FaseInstalacao.Trifasico}
                  checked={faseInstalacao === FaseInstalacao.Trifasico}
                  onChange={() => setFaseInstalacao(FaseInstalacao.Trifasico)}
                />
                <label htmlFor="trifasico">Trifásico</label>
              </div>
            </div>
          </div>

          <div className={styles.simulador__inputGroup}>
            <div className={styles.simulador__inputHeader}>
              <label htmlFor="taxaIluminacao" className={styles.simulador__label}>Taxa de iluminação pública:</label>
              <span className={styles.simulador__valueDisplay}>{formatCurrency(taxaIluminacao)}</span>
            </div>
            <input
              className={styles.simulador__range}
              id="taxaIluminacao"
              name="taxaIluminacao"
              type="range"
              min="0"
              max="3999"
              step="0.01"
              value={taxaIluminacao}
              onChange={(e) => setTaxaIluminacao(parseFloat(e.target.value))}
            />
          </div>

          <div className={styles.simulador__input}>
            <label htmlFor="nomeSimulador" className={styles.simulador__label}>Nome</label>
            <input
              className={styles.simulador__input__text}
              type="text"
              id="nomeSimulador"
              placeholder="Nome Completo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <p className={styles.simulador__termos}>
            Ao informar os meus dados, concordo com os termos de Politica de Privacidade
          </p>
          <button type="submit" className={`botao ${styles.simulador__botao}`}>Simular</button>
        </form>
      </section>

      {showModal && (
        <div className={styles.modalSimuladorResultado} role="dialog" aria-modal="true">
          <section className={styles.resultadoSimuladorContainer}>
            <button className={styles.fecharModalResultadoSimulador} onClick={() => setShowModal(false)} aria-label="Fechar resultado">
              <img src={closeIcon.src} alt="fechar" />
            </button>
            <div className={styles.resultadoSimuladorHeader}>
              <img src={energySunIcon.src} alt="ícone de energia solar" className={styles.modalSimuladorResultado__icone} />
              <h2>Olá {nome}, excelente escolha!</h2>
              <p>Aqui estão os valores que você pode economizar. Não perca tempo, comece a gerar sua própria energia!</p>
            </div>

            <div className={styles.modalSimuladorResultado__grid}>
              <div className={styles.resultadoCard}>
                <div className={styles.resultadoCard__icon}>⚡</div>
                <p className={styles.resultadoCard__label}>Nova Fatura Estimada</p>
                <p className={styles.valorDestaque}>{formatCurrency(resultado.novoValorFatura)}</p>
              </div>

              <div className={styles.resultadoCard}>
                <div className={styles.resultadoCard__icon}>💰</div>
                <p className={styles.resultadoCard__label}>Economia Mensal</p>
                <p className={styles.valorDestaqueVerde}>{formatCurrency(resultado.economiaMensal)}</p>
              </div>

              <div className={styles.resultadoCard}>
                <div className={styles.resultadoCard__icon}>☀️</div>
                <p className={styles.resultadoCard__label}>Economia Anual</p>
                <p className={styles.valorDestaqueVerde}>{formatCurrency(resultado.economiaAnual)}</p>
              </div>
            </div>
            <a href="https://wa.me/5531993600722" target="_blank" rel="noopener noreferrer" className={`botao ${styles.modalSimuladorResultado__botao}`}>
              Entre em contato pelo Whatsapp
            </a>
          </section>
        </div>
      )}
    </>
  );
}
