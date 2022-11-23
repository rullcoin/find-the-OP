import React from 'react';

const CharDropdown = props => {

    return (
        <div className='dropdown' style={props.position}>
              <div id="myDropdown" class="dropdown-content" onClick={props.showDropDown}>
                <a href="#">Boa</a>
                <a href="#">Whitebear</a>
                <a href="#">Pandaman</a>
            </div>
        </div>
    );
};

export default CharDropdown;