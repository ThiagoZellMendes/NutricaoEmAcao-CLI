export interface PatientDetailsProps {
  iconName: string;
  iconSize: number;
  titleCard: string;
  textCard: string;
  updateData: (newTitle: string) => void;
}
