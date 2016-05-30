import React from 'react';
import styles from './slideEquipmentBody.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

const SlideEquipmentBody = ({ opt, newOption, editOption, deleteOption }) => {
  const onClick = () => newOption(opt.id);
  const onRemove = (key) => deleteOption(opt.id, key);

  const options = opt.optNames.map((val, i) => {
    return (
      <tr key={ `option-${i}` }>
        <td>
          <input name="optNames" onChange={e => editOption(e.target.name, e.target.value, i) } value={ val }/>
        </td>
        <td className="removeButton">
          <Button classes="transparent sm" onClick={ onRemove.bind(this, val) }>&times;</Button>
        </td>
      </tr>
    );
  });


  return (
    <div className="slideEquipmentBody">
      <table>
        <thead>
          <tr><th>Label</th><th></th></tr>
        </thead>
        <tbody>
          { options }
        </tbody>
      </table>
      <div className="buttonRow">
        <Button classes="primary md" onClick={ onClick }>+</Button>
      </div>
    </div>
  );

};

export default SlideEquipmentBody;
