export type TGardnerIntelligence =
  | 'linguistica'
  | 'logicoMatematica'
  | 'visualEspacial'
  | 'corporal'
  | 'musical'
  | 'interpersonal'
  | 'intrapersonal'
  | 'naturalista';

export interface IGardnerItem {
  intelligence: TGardnerIntelligence;
  text: string;
}

export type TKolbStyle = 'activo' | 'reflexivo' | 'teorico' | 'pragmatico';

export interface IKolbItem {
  text: string;
  type: TKolbStyle;
  emoji: string;
}

export type TVakStyle = 'visual' | 'auditivo' | 'kinestesico';

export interface IVakItem {
  text: string;
  type: TVakStyle;
  emoji: string;
}

export interface IStudent {
  name: string;
  age: string;
  grade: string;
  familySupport: string;
  socioEmotionalLevel: string;
  rezago: boolean;
  motivation: string;
  kolbScores: {
    [key in TKolbStyle]: number;
  };
  vakScores: {
    [key in TVakStyle]: number;
  };
  gardnerScores: {
    [key in TGardnerIntelligence]: number;
  };
  interests: string;
}
