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
  id: string;
  intelligence: TGardnerIntelligence;
  text: string;
}

export interface IGardnerItemScore {
  id: string;
  score: number;
}

export type TKolbStyle = 'activo' | 'reflexivo' | 'teorico' | 'pragmatico';

export interface IKolbItem {
  text: string;
  type: TKolbStyle;
  emoji: string;
  id: string;
}

export type TVakStyle = 'visual' | 'auditivo' | 'kinestesico';

export interface IVakItem {
  text: string;
  type: TVakStyle;
  emoji: string;
  id: string;
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
  extendedKolbScores: {
    [key in TKolbStyle]: string[];
  };
  vakScores: {
    [key in TVakStyle]: number;
  };
  extendedVakScores: {
    [key in TVakStyle]: string[];
  };
  gardnerScores: {
    [key in TGardnerIntelligence]: number;
  };
  extendedGardnerScores: {
    [key in TGardnerIntelligence]: IGardnerItemScore[];
  };
  interests: string;
}
