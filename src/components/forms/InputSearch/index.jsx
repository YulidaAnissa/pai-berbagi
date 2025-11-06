import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import InputBase from '../InputBase';
import { SearchIcon } from  '../../elements/Icons';

const InputSearch = forwardRef(function InputSearch(props, ref) {

  const { 
    className,
    classButton,
    onSearch,
    onClear,
    ...inputProps 
  } = props;

  let btn = null;
  const handleSearch = (e) => {
    e.stopPropagation();
    onSearch();
  };

  const renderClear = () => {

    if(!onClear) return null;

    return (
      <span className="w-4 h-4 mr-2">
        {props.value && (
          <button onClick={() => onClear()}>
            {/* <CloseIcon height="16" width="16" /> */} close
          </button>
        )}
      </span>
    );
  };


  return (
    <InputBase
      autoComplete="off"
      className={clsx(
        'pr-0',
        className
      )}
      endAdornment={
        <>
          {renderClear()}
          <button 
            aria-label="search"
            className={clsx(
              classButton,
              'h-full flex justify-center items-center bg-black-200'
            )}
            onClick={handleSearch}
            ref={node => (btn = node)}
            type="button"
            variant="icon"
          >
            <SearchIcon fill="#7D8997"/>
          </button>
        </>
      }
      onKeyDown={e => e.key === 'Enter' && btn.click()}
      ref={ref}
      type="search"
      {...inputProps}
    />
  );
});

InputSearch.defaultProps = {
  classButton: '',
  className: '',
  onClear: null,
  onSearch: () => { },
  value: ''
};

InputSearch.propTypes = {
  classButton: PropTypes.string,
  className: PropTypes.string,
  onClear: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  onSearch: PropTypes.func,
  value: PropTypes.string,
};

export default InputSearch;