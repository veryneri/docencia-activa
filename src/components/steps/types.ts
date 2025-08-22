import type { IStudent } from '../../types/types';

type StudentModifier = (student: IStudent) => IStudent;
type StudentWithPrevDataSetter = (fn: StudentModifier) => void;
type StudentSetter = (student: IStudent) => void;

export interface ICommonStepProps {
  student: IStudent;
  setStudent: StudentWithPrevDataSetter & StudentSetter;
  step: number;
  setStep(step: number): void;
}
