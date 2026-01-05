import React from "react";
import DateInput from "@/components/common/DateInput";

interface BirthDatePickerProps {
  value: string; // Format YYYY-MM-DD
  onChange: (date: string) => void;
}

const BirthDatePicker: React.FC<BirthDatePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative z-30">
      <DateInput value={value} onChange={onChange} placeholder="dd-mm-yyyy" />
    </div>
  );
};

export default BirthDatePicker;
