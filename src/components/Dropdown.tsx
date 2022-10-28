import React from 'react';

type DropdownProps = {
  headers: any;
  onSelect: (_: any) => void;
  selected: string;
};

export const Dropdown: React.FC<DropdownProps> = ({
  headers,
  selected,
  onSelect,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelect = (value: any) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <div>Select Year</div>
      <button onClick={handleOpen}>{selected}</button>
      {open ? (
        <div className="menu">
          {headers.map((header: any) => {
            const disabled = header === '2018' || header === '2019';
            return (
              <button
                disabled={disabled}
                key={header}
                className="menu-item"
                onClick={() => handleSelect(header)}
              >
                {header}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
