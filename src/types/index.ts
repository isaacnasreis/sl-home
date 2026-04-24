// ── Enums ──

/** Fases de instalação elétrica disponíveis para simulação */
export enum FaseInstalacao {
  Monofasico = 'monofasico',
  Bifasico = 'bifasico',
  Trifasico = 'trifasico',
}

/** Mapeamento de custo base por fase (em R$) */
export const CUSTO_POR_FASE: Record<FaseInstalacao, number> = {
  [FaseInstalacao.Monofasico]: 30,
  [FaseInstalacao.Bifasico]: 50,
  [FaseInstalacao.Trifasico]: 100,
} as const;

/** Fator multiplicador da taxa de disponibilidade */
export const FATOR_DISPONIBILIDADE = 0.8 as const;

// ── Interfaces de Domínio ──

/** Dados de um projeto fotovoltaico */
export interface Projeto {
  readonly id: number;
  readonly imagem: string;
  readonly nome: string;
  readonly localidade: string;
  readonly imagens: readonly string[];
}

/** Resumo do projeto para cards (sem galeria de imagens) */
export type ProjetoCard = Omit<Projeto, 'imagens'>;

/** Depoimento de cliente */
export interface Depoimento {
  readonly nome: string;
  readonly mensagem: string;
}

/** Resultado calculado da simulação de economia */
export interface SimuladorResultado {
  readonly novoValorFatura: number;
  readonly economiaMensal: number;
  readonly economiaAnual: number;
}
